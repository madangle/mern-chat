const mongoose = require('mongoose');
const {Schema} = mongoose;

const ChatSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    groupAdmin: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;
