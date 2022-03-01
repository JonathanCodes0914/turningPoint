const User = require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }

        req.profile = user;
        next();
    })
};

exports.searchUsers = async(req, res) => {
    try {
        var q = req.query.q
        if (q === '') {
            return res.send("No User Found")
        }

        let data = await User.find({
            username: {
                $regex: new RegExp(q)
            }
        }).select({
            _id: 1,username:1, profileImg: 1
        }).limit(10)

        if(!data){
            return res.status(404).json({
                err: 'No User Found'
            })
        }

        return res.status(200).json({
            data
        })

    } catch (err) {
        return res.status(404).send(err)
    }

}


exports.editProfile = async(req, res) => {
    try {
      const {userId, firstname, lastname, username, email , password, profileImg} = req.body;

      let usernameexists = await User.findOne({ username })

      console.log('here',usernameexists)
      if (usernameexists) return res.status(400).send('User name already exists')


     let newUser = await User.findByIdAndUpdate(userId, {firstname:firstname, lastname: lastname, username: username, email: email, profileImg: profileImg}, {new:true})

     const {_id,  role,  followers, following, posts} = newUser
     const returnUser = {
        _id, firstname, lastname, email, role, username, followers, following, posts, profileImg
     }
      return res.status(200).json({
          msg:'User updated',
          returnUser
          
      })
    } catch (err) {
        return res.status(404).send(err)
    }

}

