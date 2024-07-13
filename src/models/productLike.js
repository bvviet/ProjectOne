import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productLikeSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
});

const ProductLike = mongoose.model("ProductLike", productLikeSchema);

export default ProductLike;
