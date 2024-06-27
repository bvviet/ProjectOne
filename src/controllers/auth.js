import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import User from "../models/UserModel.js";
import { registerValidator, loginValidator } from "../validations/auth.js";

class AuthController {
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
}

export default new AuthController();
