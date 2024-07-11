import { Router } from "express";
import AuthController from "../controllers/auth.js";

const authRouter = Router();

authRouter.get("/", AuthController.getAll);
authRouter.get("/:id", AuthController.getDetailUser);
authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);

export default authRouter;
