import Conversation from "../models/Conversation.js";

// Tạo một cuộc trò chuyện mới
export const findOrCreateConversation = async (req, res) => {
    try {
        const { userId, adminId, productId } = req.body;

        // Tìm cuộc trò chuyện đã tồn tại
        let conversation = await Conversation.findOne({
            participants: { userId, adminId },
            productId,
        });

        // Nếu không tìm thấy, tạo cuộc trò chuyện mới
        if (!conversation) {
            conversation = new Conversation({
                participants: {
                    userId,
                    adminId,
                },
                productId,
            });
            await conversation.save();
        }

        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy danh sách các cuộc trò chuyện của người dùng
export const getConversationsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Điều kiện truy vấn dựa trên userId
        const queryCondition =
            userId === "66bf62d725548b5188afd257"
                ? { $or: [{ "participants.userId": userId }, { "participants.adminId": userId }] }
                : { "participants.userId": userId };

        // Truy vấn cuộc trò chuyện với điều kiện đã xác định
        const conversations = await Conversation.find(queryCondition).populate(
            "participants.userId participants.adminId productId"
        );

        // Trả về danh sách cuộc trò chuyện
        res.status(200).json(conversations);
    } catch (error) {
        // Xử lý lỗi và trả về phản hồi lỗi
        res.status(500).json({ message: error.message });
    }
};

// Lấy chi tiết cuộc trò chuyện theo ID
export const getConversationById = async (req, res) => {
    try {
        const conversationId = req.params.id;
        const conversation = await Conversation.findById(conversationId)
            .populate("participants.userId")
            .populate("participants.adminId")
            .populate("productId");
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa cuộc trò truyện

export const deleteConversationById = async (req, res) => {
    try {
        const conversation = await Conversation.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Xóa thành công",
        });
    } catch (error) {
        console.log(error);
    }
};
