import Product from "../models/ProductModel.js";
import Order from "../models/order.js";
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
            const products = await Product.find().populate("category");
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
            const products = await Product.findById(req.params.id).populate("category");
            if (!products) {
                return res.status(404).json({
                    message: "Không tìm thấy sản phẩm",
                });
            }
            res.status(StatusCodes.OK).json({
                message: "Lấy thông tin sản phẩm thành công",
                data: products,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }

    // Get products with category
    async getProductsByCategory(req, res) {
        try {
            const { categoryId } = req.params;

            if (!categoryId) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Không tìm thấy danh mục này.",
                });
            }

            // Tìm tất cả sản phẩm thuộc danh mục cụ thể
            const products = await Product.find({ category: categoryId }).populate("category");

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
            const products = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
            const productId = req.params.id;

            // Xóa sản phẩm từ bảng Product
            const deletedProduct = await Product.findByIdAndDelete(productId);

            if (!deletedProduct) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Không tìm thấy sản phẩm để xóa.",
                });
            }

            // Xóa sản phẩm khỏi các đơn hàng trong bảng Order
            const deletedOrders = await Order.deleteMany({ productId: productId });

            res.status(StatusCodes.OK).json({
                message: "Xóa sản phẩm thành công.",
                deletedProduct,
                deletedOrders,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }
}

export default new ProductController();
