import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderRealSchema = new Schema(
    {
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                totalAmount: {
                    type: Number,
                    required: true,
                },
                unitAmount: {
                    type: Number,
                    required: true,
                },
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
        status: {
            type: String,
            default: "Đang xử lý",
            required: true,
        },
        shipping: {
            type: String,
        },
        note: {
            type: String,
        },
    },
    { timestamps: true }
);

const OrderReal = mongoose.model("OrderReal", orderRealSchema);

export default OrderReal;
