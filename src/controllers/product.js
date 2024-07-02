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
                message: error.message,
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
                message: error.message,
            });
        }
    }

    async getDetail(req, res) {
        try {
            const products = await Product.findById(req.params.id);
            if (!products) {
                return res.status(404).json({
                    message: "Không tìm thấy sản phẩm",
                });
            }
            res.status(StatusCodes.OK).json({
                message: "Lấy thông tin sản phẩm thành công",
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
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
                message: error.message,
            });
        }
    }

    async updateProduct(req, res) {
        try {
            const products = await Product.findByIdAndUpdate(req.params.id, req.body);
            if (!products) {
                return res.status(404).json({
                    message: "Không tìm thấy sản phẩm",
                });
            }
            res.status(StatusCodes.OK).json({
                message: "Cập nhật thành công.",
                data: products,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            const products = await Product.findByIdAndDelete(req.params.id, req.body);
            if (!products) {
                return res.status(404).json({
                    message: "Không tìm thấy sản phẩm",
                });
            }
            res.status(StatusCodes.OK).json({
                message: "Xóa thành công.",
                data: products,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }
}

export default new ProductController();
