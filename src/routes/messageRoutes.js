import express from "express";
import { createMessage, getMessagesByConversation } from "../controllers/messageController.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/:conversationId", getMessagesByConversation);

export default router;
