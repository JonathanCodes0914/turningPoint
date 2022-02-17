const Post = require('../models/post');
const User = require('../models/user');
const Request = require('../models/request');
const Comment = require('../models/comment');

exports.createPost = (req, res) => {
    const { user_id, caption, attachments, tags } = req.body;
    const splitTags = tags.split(" ");
    if (user_id && caption) {
        const newPost = new Post({
            user: {
                _id: user_id
            },
            content: {
                caption: caption,
                attachments: attachments
            },
            tags: []
        })

        newPost.save().then((data) => {
            User.updateOne({_id: user_id}, {$push: {
                "posts": newPost._id
            }}).exec()
            return res.status(200).send("post created")
        })
    } else {
        return res.status(400)
    }
}

exports.getAllPostByUser = async(req, res) => {
    try {
        const { userId } = req.params;
        console.log('user id',userId)
       
        let data = await  User.findById(userId).select({ _id: 1,username:1, profileImg: 1, posts: 1, followers: 1, following:1}).populate('posts').exec()
        //grab requests where userId is userB, then populate user A and return to cliient
        //check for if request is active already
        let requests = await Request.find({ userB : userId}).populate('userA').select({ _id: 1, username: 1, profileImg: 1 })
        console.log(data)
        if(data) {
            return res.status(200).json({
                data,
                requests
            })
        }

    } catch (err) {
        return res.status(400).json({err})
    }



}


exports.getUserFeedFollowersPosts  = async(req, res) => {
    try {
        const { userId } = req.params;
        const allUserIds = [];
        console.log('user id right here',userId)
        let user = await User.findById(userId)
        console.log('user', user)
        allUserIds.push(userId)
        user.following.forEach((id) => allUserIds.push(id))
        console.log('all user Ids',allUserIds)
        let data = await  Post.find({'user._id': {$in: allUserIds} }).sort({createdAt: 'descending'}).populate({path: 'user._id', select: 'username profileImg _id'}).populate({ path: 'comments', populate : {
            path: 'user',
            select: 'username profileImg _id'
        }});
        if(data) {
            return res.status(200).json({
                data  
            })
        }

    } catch (err) {
        return res.status(400).json({err})
    }

}



exports.getOnePostByUser = async(req, res) => {
    try {
        const { postId } = req.params;
        let data = await Post.find({ '_id': postId }).populate({ path: 'user._id', model: 'User', select: { '_id': 1,'username':1, 'profileImg': 1}}).exec();

        if(data.length > 0) {
            return res.status(200).json({
                data
            })
        }

    } catch (err) {
        return res.status(400).json({err})
    }

}

exports.interactPost = async (req, res) => {
    try {
        console.log(req.body)
        const {  type, userId, postId, commentValue } = req.body;
        if (type === 'Like') {
            await Post.updateOne({ _id: postId }, {
                $addToSet: {
                    "likes": userId
                }
            });

            return res.status(200).json({
                msg:"post Liked"
            })
        }
        if (type === 'Unlike') {
            await Post.updateOne(
                { _id: postId },
                { $pull: { 'likes': userId } }
            )

            return res.status(200).json({
                msg:"post Unliked"
            })
        }

        if(type === 'Comment') {

            if(commentValue === '') {
                return res.status(400).json({
                    msg: 'No comment Value'
                })
            }
            let newComment = await new Comment({
                user: userId,
                content:{
                    body: commentValue
                }
            });
            console.log('newcomment', newComment._id)

            await Post.updateOne({ _id: postId }, {
                $push: {
                    "comments": newComment._id
                }
            });
            newComment.save();

            return res.status(200).json({
                msg: 'Comment Successful'
            })
        }

    } catch (err) {
        return res.status(400).send(err)
    }
}