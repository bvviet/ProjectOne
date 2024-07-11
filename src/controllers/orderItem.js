import OrderItem from "../models/oderItem.js";
import Order from "../models/order.js";
import Product from "../models/ProductModel.js";

import { StatusCodes } from "http-status-codes";

class OrderItemController {
    async addOrderItem(req, res) {
        const { productId, quantity } = req.body;

        try {
            // Bước 1: Lấy thông tin sản phẩm từ cơ sở dữ liệu
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Sản phẩm không tồn tại",
                });
            }

            // Bước 2: Tìm hoặc tạo Order và cập nhật nó
            let order = await Order.findOne({ userId: req.params.userId, status: "cart" }).populate("order");

            if (!order) {
                // Nếu không tìm thấy đơn hàng cho người dùng hiện tại, tạo một đơn hàng mới
                order = await Order.create({
                    order: [],
                    totalPrice: 0,
                    userId: req.params.userId,
                    status: "cart",
                    shipping: "",
                    note: "",
                    currency: "USD",
                });
            }

            // Đảm bảo rằng order luôn là một mảng
            if (!Array.isArray(order.order)) {
                order.order = [];
            }

            // Kiểm tra xem sản phẩm đã có trong Order hay chưa
            let existingOrderItem = await OrderItem.findOne({ _id: { $in: order.order }, productId });

            if (existingOrderItem) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng và tính lại giá
                existingOrderItem.quantity += quantity;
                existingOrderItem.unitAmount = product.price; // Cập nhật lại giá đơn vị sản phẩm
                existingOrderItem.totalAmount = existingOrderItem.quantity * product.price; // Tính lại tổng giá

                await existingOrderItem.save();
            } else {
                // Nếu sản phẩm chưa tồn tại, tạo OrderItem mới và thêm vào Order
                const newItem = await OrderItem.create({
                    productId,
                    quantity,
                    unitAmount: product.price, // Lưu giá sản phẩm tại thời điểm hiện tại
                    totalAmount: product.price * quantity, // Tính tổng giá cho item
                });
                order.order.push(newItem._id);
            }

            // Lưu Order sau khi cập nhật
            await order.save();

            res.status(StatusCodes.OK).json({
                message: "Thêm vào giỏ hàng và đơn hàng thành công",
                data: { order },
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }

    async getOderItem(req, res) {
        try {
            const orderItem = await OrderItem.find().populate("productId");
            res.status(StatusCodes.OK).json({
                message: "Get all",
                data: orderItem,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }

    async getOder(req, res) {
        try {
            const order = await Order.find({ userId: req.params.userId })
                .populate({
                    path: "order",
                    populate: { path: "productId" },
                })
                .populate("userId");
            res.status(StatusCodes.OK).json({
                message: "Get all",
                data: order,
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }

    async deleteOrder(req, res) {
        try {
            const deletedOrders = await OrderItem.findByIdAndDelete(req.params.id);
            if (!deletedOrders) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Không tìm thấy sản phẩm cần xóa.",
                });
            }
            res.status(StatusCodes.OK).json({
                message: "Xóa đơn hàng và các sản phẩm thành công.",
            });
        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: error.message,
            });
        }
    }
}

export default new OrderItemController();
