import mongoose from "mongoose";

export default async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/project1");
        console.log(process.env.DB_URL);
    } catch (error) {
        console.log("Connect failure!!!");
    }
}
