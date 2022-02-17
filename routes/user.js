const jwt = require('jsonwebtoken');
const User = require('../models/user');
const expressJwt = require('express-jwt');
require('dotenv').config()

const {userById, searchUsers, editProfile} = require("../controllers/user");
const router = require('./authentication');
const { requireSignIn , isAuth, isAdmin} = require('../controllers/authenticaton');

router.get('/secret/:userId', requireSignIn , isAuth,(req,res) => {
    res.json(req.profile)
})

router.get('/search', searchUsers)
router.post('/editProfile' , editProfile)
router.param('userId', userById);

module.exports = router;