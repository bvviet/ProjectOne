import { Router } from "express";
import authRouter from "./auth.js";
import productRouter from "./product.js";
import commentRouter from "./comment.js";
import orderRouter from "./order.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Home");
});
router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/comment", commentRouter);
router.use("/order", orderRouter);

export default router;
