import Joi from "joi";

const registerValidator = Joi.object({
    userName: Joi.string().min(3).required().messages({
        "any.required": "Vui lòng nhập tên người dùng",
        "string.empty": "Vui lòng nhập tên người dùng",
        "string.min": "Tên người dùng phải có ít nhất {#limit} ký tự",
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Vui lòng nhập địa chỉ email",
        "string.empty": "Vui lòng nhập địa chỉ email",
        "string.email": "Địa chỉ email không hợp lệ",
    }),
    password: Joi.string().min(6).required().messages({
        "any.required": "Vui lòng nhập mật khẩu",
        "string.empty": "Vui lòng nhập mật khẩu",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
    }),
    avatar: Joi.string().allow("").messages({
        "string.base": "avatar không được là số",
    }),
    role: Joi.string().allow(""),
}).options({
    abortEarly: false,
});

const loginValidator = Joi.object({
    email: Joi.string().email().required().messages({
        "any.required": "Vui lòng nhập địa chỉ email",
        "string.empty": "Vui lòng nhập địa chỉ email",
        "string.email": "Địa chỉ email không hợp lệ",
    }),
    password: Joi.string().required().messages({
        "any.required": "Vui lòng nhập mật khẩu",
        "string.empty": "Vui lòng nhập mật khẩu",
    }),
}).options({
    abortEarly: false,
});

export { registerValidator, loginValidator };
