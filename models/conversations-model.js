import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
    members: {
        //Storing senderId & receiverId
        type: Array
    },
    message: {
        //Storing the msg to be shown in conversation list( last msg )
        type: String
    }
},{
    timestamps: true
});

const Conversation = mongoose.model('Conversation', ConversationSchema);
export default Conversation;