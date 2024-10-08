import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import User from "../models/UserModel.js";
import { registerValidator, loginValidator } from "../validations/auth.js";

class AuthController {
    async getAll(req, res) {
        try {
            const user = await User.find();
            res.status(StatusCodes.OK).json({
                message: "Lấy thông tin người dùng thành công",
                data: user,
            });
        } catch (error) {
            res.status(StatusCodes.OK).json({
                message: error,
            });
        }
    }

    async getDetailUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Không tìm thấy tài khoản này",
                });
            }
            res.status(StatusCodes.OK).json({
                message: "Lấy thông tin người dùng thành công",
                data: { ...user.toObject(), password: undefined },
            });
        } catch (error) {
            res.status(StatusCodes.OK).json({
                message: error,
            });
        }
    }

    async register(req, res) {
        try {
            // Bước 1 validate email, pass, userName
            const { userName, email, password, avatar } = req.body;
            const { error } = registerValidator.validate(req.body);
            if (error) {
                const errors = error.details.map((err) => err.message);
                return res.status(StatusCodes.BAD_REQUEST).json({ errors });
            }
            // Bước 2  kiểm tra email đã được đăng kí chưa
            const emailExist = await User.findOne({ email });
            if (emailExist) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Email đã được đăng ký",
                });
            }
            // Bước 3 mã hóa password
            const hashPassword = await bcryptjs.hash(password, 10);
            // Bước 4 Đăng ký
            const user = await User.create({ userName, email, password: hashPassword, avatar });
            // Bước 5 ẩn password
            res.status(StatusCodes.OK).json({
                message: "Đăng ký thành công",
                data: { ...user.toObject(), password: undefined },
            });
        } catch (error) {
            console.log(error);
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            // Bước 1 validate email, password
            const { error } = loginValidator.validate(req.body);
            if (error) {
                const errors = error.details.map((err) => err.message);
                return res.status(StatusCodes.BAD_REQUEST).json({ errors });
            }

            // Bước 2 check email đã được đăng ký chưa
            const checkUser = await User.findOne({ email });
            if (!checkUser) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Email này chưa được đăng ký",
                });
            }

            // Bước 3 so sánh password
            const checkPassword = await bcryptjs.compare(password, checkUser.password);
            if (!checkPassword) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Mật khẩu không đúng vui lòng nhập lại!",
                });
            }

            // Bước 4 tạo token
            const token = jwt.sign({ id: checkUser._id }, "token", { expiresIn: "2h" });

            // Bước 5 đăng nhập
            res.status(StatusCodes.OK).json({
                message: "Đăng nhập thành công",
                data: { ...checkUser.toObject(), password: undefined },
                token,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async updateProfile(req, res) {
        const { userName, email, avatar, address, phone } = req.body;
        const { userId } = req.params;

        try {
            const userExists = await User.findById(userId);
            if (!userExists) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Không tồn tại tài khoản.",
                });
            }
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { userName, email, avatar, address, phone },
                { new: true }
            );

            res.status(StatusCodes.OK).json({
                message: "Cập nhật thành công.",
                user: updatedUser,
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
            });
        }
    }

    async deleteUser(req, res) {
        const { userId } = req.params;
        try {
            const user = await User.findByIdAndDelete({ _id: userId });
            if (!user) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: "Không tồn tại tài khoản.",
                });
            }
            res.status(StatusCodes.OK).json({
                message: "Xóa thành công.",
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: error.message,
            });
        }
    }
}

export default new AuthController();
