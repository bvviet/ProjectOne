import Comment from "../models/comment.js";
import { StatusCodes } from "http-status-codes";

class CommentController {
    async getAll(req, res) {
        try {
            const comment = await Comment.find();
            res.status(StatusCodes.OK).json({
                message: "Tất cả bình luận",
                data: comment,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }
    async getDetail(req, res) {
        try {
            const comment = await Comment.find({ productId: req.params.productId }).populate("userId");
            if (!comment) {
                return res.status(404).json({
                    message: "Không tìm thấy sản phẩm",
                });
            }
            return res.status(StatusCodes.OK).json({
                message: "Lấy bình luận thành công",
                data: comment,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }
    async createComment(req, res) {
        try {
            const comment = await Comment.create(req.body);
            return res.status(StatusCodes.OK).json({
                message: "Thêm bình luận thành công",
                data: comment,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }
    async updateComment(req, res) {
        try {
            const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!comment) {
                return res.status(404).json({
                    message: "Không thấy bình luận",
                });
            }
            res.status(StatusCodes.OK).json({
                message: "Cập nhật bình luận thành công",
                data: comment,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }
    async deleteComment(req, res) {
        try {
            const comment = await Comment.findByIdAndDelete(req.params.id);
            if (!comment) {
                return res.status(404).json({
                    message: "Không tìm thấy bình luận",
                });
            }
            res.status(StatusCodes.OK).json({
                message: "Xoá bình luận thành công",
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }
}

export default new CommentController();
