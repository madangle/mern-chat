import mongooose from 'mongoose';
const {Schema} = mongooose;

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
    readBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

export default mongooose.model('Message', MessageSchema);