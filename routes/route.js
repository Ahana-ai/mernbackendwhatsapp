import express from "express";
const router = express.Router();
import ConversationController from "../controller/conversation-controller.js";
import UserController from "../controller/user-controller.js";
import MessageController from "../controller/message-controller.js";
import { getFile, uploadFile } from "../controller/attachment-controller.js";

import upload from "../utils/upload.js";

// User 
router.post('/add', UserController.addUser);
router.get('/users', UserController.getUser);

// Conversation
router.post('/conversation/add', ConversationController.newConversation);
router.post('/conversation/get', ConversationController.getConversation);

//Message
router.post('/message/add', MessageController.newMessage);
router.get('/message/get/:id', MessageController.getMessage);

// Attachment upload
router.post('/file/upload', upload.single('file'), uploadFile);
router.get('/file/:filename', getFile);

export default router;