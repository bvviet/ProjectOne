import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            require: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
            required: true,
        },
        imageURL: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("products", ProductSchema);

export default Product;
