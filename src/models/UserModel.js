import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        role: {
            type: String,
            default: "member",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

export default User;
