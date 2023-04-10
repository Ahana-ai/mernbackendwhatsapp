import Conversation from "../models/conversations-model.js";

class ConversationController {
  constructor() {}

  /**
   * @method newConversation
   * @description To check if a old conversation already exists, if not create a new one or else continue to chat
   */
  async newConversation(req, res) {
    try {
      const senderId = req.body.senderId;
      const receiverId = req.body.receiverId;
      console.log(req.body.message, "message plz");

      const exist = await Conversation.findOne({
        members: { $all: [senderId, receiverId] },
      });

      if (exist) {
        res.status(200).json("Conversation already exists");
        return;
      }

      //If convo doesn't exist, we need to create a new one
      const newConversation = new Conversation({
        members: [senderId, receiverId],
        message: req.body.message,
      });
      let savedConversation = await newConversation.save();
      return res.status(200).json(savedConversation);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  /**
   * @method getConversation
   * @description To Get the conversation id from the db using the senderId and receiverId
   */
  async getConversation(req, res) {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.body.senderId, req.body.receiverId] },
      });
      return res.status(200).json(conversation);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default ConversationController = new ConversationController();
