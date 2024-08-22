import express from "express";
import {
    findOrCreateConversation,
    getConversationsByUser,
    getConversationById,
    deleteConversationById,
} from "../controllers/conversationController.js";

const router = express.Router();

router.post("/", findOrCreateConversation);
router.get("/user/:userId", getConversationsByUser);
router.get("/:id", getConversationById);
router.delete("/:id", deleteConversationById);

export default router;
