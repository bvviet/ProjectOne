import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Category = mongoose.model("category", categorySchema);

export default Category;
