import Message from "../models/Message.js";
import { io } from "../../index.js";
// Tạo một tin nhắn mới
export const createMessage = async (req, res) => {
    try {
        const { conversationId, sender, content } = req.body;

        // Kiểm tra các trường cần thiết
        if (!conversationId || !sender || !content) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Tạo tin nhắn mới
        const newMessage = await Message.create({
            conversation: conversationId,
            sender,
            content,
        });

        // Phát tin nhắn mới cho tất cả người dùng trong cuộc trò chuyện
        io.to(conversationId).emit("on-chat", {
            message: newMessage,
        });

        res.status(201).json({
            data: newMessage,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy tất cả tin nhắn theo ID cuộc trò chuyện
export const getMessagesByConversation = async (req, res) => {
    try {
        const conversationId = req.params.conversationId;

        // Tìm tất cả tin nhắn theo ID cuộc trò chuyện
        const messages = await Message.find({ conversation: conversationId })
            .populate("sender")
            .populate("conversation"); // Thêm populate nếu bạn cần thông tin từ mô hình Conversation

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
};
