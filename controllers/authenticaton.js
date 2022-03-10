const jwt = require('jsonwebtoken');
const User = require('../models/user');
const expressJwt = require('express-jwt');
require('dotenv').config()

exports.signup = async (req, res) => {

    try {

        const { email, password, firstname, lastname, username } = req.body;
        let useremail = await User.findOne({ email });
        let usernameexists = await User.findOne({ username })
        if (useremail) return res.status(400).send('User email already Registered')
        if (usernameexists) return res.status(400).send('User name already exists')

        user = new User(req.body);

        user.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    err
                })
            }

            user.salt = undefined
            user.hashed_password = undefined

            const { _id, firstname, lastname, email, role, username, followers, following, posts, profileImg } = user
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
            res.cookie('t', token, { expire: new Date() + 9999 });
            res.json({
                token,
                user: { _id, firstname, lastname, email, role, username, followers, following, posts,  profileImg }
            })
        })
    } catch (err) {
        return res.status(400).send('Something went wrong')
    }



}



exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: 'User Does Not Exist, Please Sign Up'
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                err: 'Email or Password Incorrect'
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('t', token, { expire: new Date() + 9999 });

        const { _id, firstname, lastname, email, role, username, followers, following, posts, profileImg } = user

        return res.json({
            token,
            user: { _id, firstname, lastname, email, role, username, followers, following, posts,  profileImg }
        })
    })

};


exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({
        message: 'Cookie Clear User Sign out'
    })
};

exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth'
});
