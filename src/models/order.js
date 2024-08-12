import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        order: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "OrderItem",
                required: true,
            },
        ],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
