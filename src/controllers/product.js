import Product from "../models/ProductModel.js";
import { StatusCodes } from "http-status-codes";

class ProductController {
    async searchProduct(req, res) {
        try {
            const { name } = req.query;
            const filter = {};
            if (name) {
                filter.name = new RegExp(name, "i");
            } else {
                return res.status(200).json({
                    message: "Không có kết quả",
                    data: [],
                });
            }
            const products = await Product.find(filter);

            res.status(StatusCodes.OK).json({
                message: "Tìm kiếm thành công",
                data: products,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error,
            });
        }
    }

    async getAll(req, res) {
        try {
            const products = await Product.find();
            res.status(StatusCodes.OK).json({
                message: "Lấy dữ liệu thành công",
                data: products,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error,
            });
        }
    }

    async getDetail(req, res) {
        try {
            res.send("Get Detail");
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error,
            });
        }
    }

    async createProduct(req, res) {
        try {
            const products = await Product.create(req.body);
            res.status(StatusCodes.OK).json({
                message: "Thêm thành công",
                data: products,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error,
            });
        }
    }

    async updateProduct(req, res) {
        try {
            res.send("Update Product");
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error,
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            res.send("Delete Product");
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error,
            });
        }
    }
}

export default new ProductController();
