import ProductLike from "../models/productLike.js";

import { StatusCodes } from "http-status-codes";

class productLikeController {
    async getAllFavorite(req, res) {
        try {
            const { userId } = req.params;
            const favorites = await ProductLike.find({ userId }).populate("productId");
            res.status(200).json({ favorites });
        } catch (error) {
            res.status(StatusCodes.OK).json({ message: "Lỗi khi lấy danh sách sản phẩm yêu thích." });
        }
    }

    async createFavorite(req, res) {
        try {
            const { productId, userId } = req.body;
            // Kiểm tra xem sản phẩm đã tồn tại trong danh sách yêu thích của người dùng chưa
            const existingFavorite = await ProductLike.findOne({ productId, userId });
            if (existingFavorite) {
                return res
                    .status(StatusCodes.BAD_REQUEST)
                    .json({ message: "Sản phẩm đã có trong danh sách yêu thích." });
            }
            const favorite = await ProductLike.create({ productId, userId });
            res.status(StatusCodes.OK).json({ message: "Đã thêm sản phẩm vào danh sách yêu thích.", data: favorite });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }

    async deleteFavorite(req, res) {
        try {
            const { productId } = req.params;
            const favorite = await ProductLike.findByIdAndDelete(productId);
            if (!favorite) {
                return res.status(404).json({
                    message: "Không tìm thấy sản phẩm cần xóa",
                });
            }
            res.status(StatusCodes.OK).json({
                message: "Xóa thành công",
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }
}

export default new productLikeController();
