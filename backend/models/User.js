const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema} = mongoose;

// user schema definition
const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'

    },
    status: {
        type: String,
        default: 'offline'
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
});

// check password matches
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// encrypt password before save
UserSchema.pre('save', async function(next) {
    if(!this.isModified()) {
        return next();
    }
    if(this.isModified('password')){
        const salt= await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

// https://i.pravatar.cc/150?img=7