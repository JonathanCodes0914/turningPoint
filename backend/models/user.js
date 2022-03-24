const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    lastname: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    profileImg: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
    },
    email: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true,
    },
    hashed_password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
         unique: true
    },
    bio: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    },

    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]


}, { timestamps: true });

//virtual field

userSchema.virtual('password')
    .set(function(password){
        this._password = password
        this.salt = uuidv4();
        console.log(this.salt)
        this.hashed_password = this.encryptPassword(password);

    })
    .get(function() {
        return this._password
    })

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function(password) {
        if (!password) return '';

        try {
            return require('crypto').createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return '';
        }
    }
}

module.exports = mongoose.model('User', userSchema)