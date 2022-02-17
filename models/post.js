const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    user:{
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    },
    content: {
    caption: {type:String},
    attachments: []
    },

    tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true})


module.exports = mongoose.model('Post', postSchema)