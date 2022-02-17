const express = require("express");
const router = express.Router();
require('dotenv').config();

const { requireSignIn , isAuth, isAdmin} = require('../controllers/authenticaton');
const { interactPost,createPost, getAllPostByUser, getOnePostByUser, getUserFeedFollowersPosts} = require("../controllers/post");
router.post('/createPost', createPost)
router.post('/interactPost', interactPost)
router.get('/getUserPosts/:userId', getAllPostByUser)
router.get('/getUserPost/:postId', getOnePostByUser)
router.get('/getFeedPosts/:userId', getUserFeedFollowersPosts)


module.exports = router;