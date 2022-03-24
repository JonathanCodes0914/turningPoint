require('dotenv').config()

const {userById, searchUsers, editProfile} = require("../controllers/user");
const router = require('./authentication');
const { requireSignIn , isAuth} = require('../controllers/authenticaton');

router.get('/secret/:userId', requireSignIn, (req,res) => {
    res.json(req.profile)
})

router.get('/search',requireSignIn, searchUsers)
router.post('/editProfile', requireSignIn,  editProfile)
router.param('userId', userById);

module.exports = router;