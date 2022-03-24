const mongoose = require('mongoose');


const requestSchema = new mongoose.Schema({
    userA: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userB : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    type: String,
    status:{
        type: Number,
        default: 1
    }
}, {timestamps: true})


module.exports = mongoose.model('Request', requestSchema)