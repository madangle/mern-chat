const mongooose = require('mongoose');
const { Schema } = mongooose;

const MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    },
    content: {
        type: String,
        required: true
    },
    readBy: [{ 
        type: Schema.Types.ObjectId, 
        ref: "User" 
    }],
}, {
    timestamps: true
})

const Message = mongooose.model('Message', MessageSchema);
module.exports = Message;


// CHAT 68590b0e5b310d753e4b4c86

// USER 1 6858dd276b57f4acb2b7e416
// USER 2 6858dd4e6b57f4acb2b7e41c

