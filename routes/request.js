const express = require("express");
const router = express.Router();
require('dotenv').config();

const { createRequest, getRequests, acceptRequest} = require('../controllers/request');

router.post('/createRequest', createRequest)
router.post('/requestResult', acceptRequest)
router.get('/getRequests/:userId', getRequests)



module.exports = router;