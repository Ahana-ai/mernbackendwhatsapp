import Message from "../models/message-model.js";
import Conversation from "../models/conversations-model.js";

class MessageController {
  constructor() {}

  /**
   * @method newMessage
   * @description To store the new msg in db
   */
  async newMessage(req, res) {
    try {
      const senderId = req.body.senderId;
      const receiverId = req.body.receiverId;

      const exist = await Conversation.findOne({
        members: { $all: [senderId, receiverId] },
      });

      console.log(req.body, "bodyyyy");
      console.log(exist);

      if (!exist) {
        //If convo doesn't exist, we need to create a new one
        const newConversation = new Conversation({
          members: [senderId, receiverId],
          message: req.body.text,
        });
        await newConversation.save();
        console.log("Convo Created");

        const convo = await Conversation.findOne({
          members: { $all: [senderId, receiverId] },
        });

        const newMessage = new Message({
          ...req.body,
          conversationId: convo._id,
        });
        await newMessage.save();
        console.log(convo.message);
      } else {
        const newMessage = new Message({
          ...req.body,
          conversationId: exist._id,
        });
        await newMessage.save();
        await Conversation.findByIdAndUpdate(req.body.conversationId, {
          message: req.body.text,
        });
      }
      return res.status(200).json("Message has been sent successfully!");
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  }

  /**
   * @method getMessage
   * @description To fetch msgs from db
   */
  async getMessage(req, res) {
    try {
      const messages = await Message.find({ conversationId: req.params.id });
      return res.status(200).json(messages);
    } catch (error) {
      res.status(200).json(error);
    }
  }
}

export default MessageController = new MessageController();
