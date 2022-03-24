const express = require("express");
const router = express.Router();
require('dotenv').config();

const { requireSignIn} = require('../controllers/authenticaton');
const { interactPost,createPost, getAllPostByUser, getOnePostByUser, getUserFeedFollowersPosts} = require("../controllers/post");
router.post('/createPost', requireSignIn,  createPost )
router.post('/interactPost', requireSignIn, interactPost)
router.get('/getUserPosts/:userId',requireSignIn, getAllPostByUser)
router.get('/getUserPost/:postId', requireSignIn, getOnePostByUser)
router.get('/getFeedPosts/:userId',requireSignIn, getUserFeedFollowersPosts)


module.exports = router;