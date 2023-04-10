import mongoose, { model } from 'mongoose';
const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: String
    },
    receiverId: {
        type: String
    },
    senderId: {
        type: String
    },
    text: {
        type: String
    },
    type: {
        type: String
    }
}, {
    timestamps: true
});

const Message = new mongoose.model('message', MessageSchema);
export default Message;