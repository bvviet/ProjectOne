import mongoose from "mongoose";
import Product from "./ProductModel.js";
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    unitAmount: {
        type: Number,
        default: 1,
    },
    totalAmount: {
        type: Number,
    },
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;
