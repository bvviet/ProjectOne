import OrderReal from "../models/orderReal.js";
import { StatusCodes } from "http-status-codes";

class orderRealController {
    // create
    async createOrder(req, res) {
        const { products, userId, totalPrice, status, shipping, note } = req.body;
        try {
            const order = await OrderReal.create({
                products, // Mảng các sản phẩm
                userId,
                totalPrice,
                status,
                shipping,
                note,
            });

            res.status(StatusCodes.CREATED).json({
                message: "Order created successfully",
                data: order,
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
            });
        }
    }

    async getDetailOrder(req, res) {
        try {
            const order = await OrderReal.find({ userId: req.params.id })
                .populate("userId")
                .populate({
                    path: "products",
                    populate: {
                        path: "productId",
                    },
                });
            if (!order) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Khong tim thay",
                });
            }
            res.status(StatusCodes.OK).json({
                message: "Lay thanh cong",
                data: order,
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
            });
        }
    }

    async deleteOrder(req, res) {
        try {
            const order = await OrderReal.findByIdAndDelete(req.params.id);
            if (!order) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Khong tim thay",
                });
            }
            res.status(StatusCodes.OK).json({
                message: "Xoa thanh cong",
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
            });
        }
    }
}

export default new orderRealController();
