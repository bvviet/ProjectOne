import { Router } from "express";
import authRouter from "./auth.js";
import productRouter from "./product.js";
import commentRouter from "./comment.js";
import orderRouter from "./order.js";
import productLikeRouter from "./productLike.js";
import categoriesRouter from "./category.js";
import orderRealRouter from "./orderReal.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Home");
});
router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/categories", categoriesRouter);
router.use("/comment", commentRouter);
router.use("/order", orderRouter);
router.use("/favorite", productLikeRouter);
router.use("/orderReal", orderRealRouter);
// router.use("/conversation", conversationRouter);
// router.use("/message", messageRouter);

export default router;
