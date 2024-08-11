import Category from "../models/category.js";
import { StatusCodes } from "http-status-codes";

class CategoryController {
    // create category
    async createCategories(req, res) {
        try {
            const categories = await Category.create(req.body);
            res.status(StatusCodes.OK).json({
                message: "Thêm danh mục thành công",
                data: categories,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }

    // get all category
    async getAllCategories(req, res) {
        try {
            const categories = await Category.find();
            res.status(StatusCodes.OK).json({
                message: "Lấy danh mục thành công",
                data: categories,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }

    // get detail category
    async getDetailCategories(req, res) {
        try {
            const categories = await Category.findById(req.params.id);
            res.status(StatusCodes.OK).json({
                message: "Lấy chi tiết danh mục thành công",
                data: categories,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }

    // update category
    async updateCategories(req, res) {
        const { name, description, image } = req.body;
        try {
            const categories = await Category.findByIdAndUpdate(
                req.params.id,
                { name, description, image },
                { new: true }
            );
            if (!categories) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Không tồn tại danh mục này.",
                });
            }
            res.status(StatusCodes.OK).json({
                message: "Cập nhật danh mục thành công",
                data: categories,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }

    // delete category
    async deleteCategories(req, res) {
        try {
            const categories = await Category.findByIdAndDelete(req.params.id);
            if (!categories) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Không tồn tại danh mục này.",
                });
            }
            res.status(StatusCodes.OK).json({
                message: "Xóa danh mục thành công",
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }
}

export default new CategoryController();
