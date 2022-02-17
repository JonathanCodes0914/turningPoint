const Request = require('../models/request');
const User = require('../models/user');

exports.createRequest = async (req, res) => {
    try {
        const { userA, userB, type } = req.body;
        let newRequest = new Request({
            userA: userA,
            userB: userB,
            type: type
        });
        newRequest.save().then(() => {
            return res.status(200).json({
                msg: 'Request Successful'
            })
        })
    } catch (err) {
        return res.status(400).json({
            msg: 'Request UnSuccessful'
        })
    }
}

exports.getRequests = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId)
        let foundRequests = await Request.find({ userB: userId, status: 1 }).populate('userA').select({ _id: 1, username: 1, profileImg: 1 });

        if (foundRequests) {
            return res.status(200).json({
                foundRequests
            })
        } else {
            return res.status(404).json({
                msg: 'No Requests Found'
            })
        }
    } catch (err) {
        return res.status(404).json({
            err
        })
    }
}

exports.acceptRequest = async (req, res) => {
    try {
        console.log(req.body)
        const { requestId, type, userId, userRequestingId, userFollowersId, userIdToDelete } = req.body;
        if (type === 'Accept') {
            //update status 2 = Accepted
            await Request.findByIdAndUpdate(requestId, { status: 2 });
            //adding userA to followers of user B  
            await User.updateOne({ _id: userId }, {
                $push: {
                    "followers": userRequestingId
                }
            });
            //add userB to following of userA
            await User.updateOne({ _id: userRequestingId }, {
                $push: {
                    "following": userId
                }
            })
            return res.status(200).json({
                msg: 'Request Accepted'
            })

        }
        if (type === 'Decline') {
            await Request.findByIdAndDelete(requestId);
            return res.status(200).json({
                msg: 'Request Deleted'
            })

        }

        if (type === 'Unfollow') {
            await User.updateOne(
                { _id: userFollowersId },
                { $pull: { followers: userIdToDelete } }
            )

            //also delete following
            await User.updateOne(
                { _id: userIdToDelete },
                { $pull: { following: userFollowersId } }
            )

            await Request.find({ userA: userIdToDelete, userB: userFollowersId }).remove().exec();


            return res.status(200).json({
                msg: 'user unfollowed'
            })
        }
    } catch (err) {
        return res.status(400).send(err)
    }
}

