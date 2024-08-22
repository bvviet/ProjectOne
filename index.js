import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";

import router from "./src/routes/index.js";
import connectMongoDB from "./src/config/connectDb.js";
import conversationRoutes from "./src/routes/conversationRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";
import Message from "./src/models/Message.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://font-project-one.vercel.app",
        methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"], // Đảm bảo sử dụng cả hai phương thức
});

// Kết nối với MongoDB
connectMongoDB();

// Cấu hình middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Kết nối routes
app.use("/", router);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

// Khi có kết nối từ client
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Lắng nghe sự kiện gửi tin nhắn từ client
    socket.on("on-chat", async (data) => {
        const { conversationId, sender, content } = data;
        console.log(data);

        try {
            // Tạo tin nhắn mới trong cơ sở dữ liệu
            const newMessage = await Message.create({
                conversation: conversationId,
                sender,
                content,
            });

            // Phát tin nhắn mới cho tất cả người dùng trong cuộc trò chuyện
            io.to(conversationId).emit("on-chat", {
                message: newMessage,
            });
        } catch (error) {
            console.error("Error creating message:", error);
        }
    });

    // Tham gia vào một cuộc trò chuyện (Room)
    socket.on("joinConversation", (conversationId) => {
        socket.join(conversationId);
        console.log(`User ${socket.id} joined conversation ${conversationId}`);
    });

    // Ngắt kết nối
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Khởi động server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
export { io };
export default server;
