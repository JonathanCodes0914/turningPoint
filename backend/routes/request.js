const express = require("express");
const router = express.Router();
require('dotenv').config();

const { requireSignIn} = require('../controllers/authenticaton');
const { createRequest, getRequests, acceptRequest} = require('../controllers/request');

router.post('/createRequest', requireSignIn, createRequest)
router.post('/requestResult', requireSignIn, acceptRequest)
router.get('/getRequests/:userId', requireSignIn, getRequests)



module.exports = router;