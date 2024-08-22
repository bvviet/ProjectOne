import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        content: { type: String },
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
