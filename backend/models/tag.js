
const mongoose = require('mongoose');


const tagSchema = new mongoose.Schema({
    name: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tagCount: {
        type: Number,
        default: 0
    }

}, {timestamps: true})


module.exports = mongoose.model('Tag', tagSchema)