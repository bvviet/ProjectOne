import { Router } from "express";
import authRouter from "./auth.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Home");
});
router.use("/auth", authRouter);

export default router;
