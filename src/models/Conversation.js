import mongoose from "mongoose";

const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    participants: {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        adminId: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // Sử dụng cùng một mô hình
    },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
