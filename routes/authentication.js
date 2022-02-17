const express = require("express");
const router = express.Router();
const { signup , signin, signout, requireSignIn, isAdmin, isAuth} = require('../controllers/authenticaton');

//Routes for SIGNUP and LOGIN

router.post('/signup', signup)
router.post('/login', signin)
router.get('/signout', signout)

module.exports = router;