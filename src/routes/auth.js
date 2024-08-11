import { Router } from "express";
import AuthController from "../controllers/auth.js";

const authRouter = Router();

authRouter.get("/", AuthController.getAll);
authRouter.get("/:id", AuthController.getDetailUser);
authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.patch("/update/:userId", AuthController.updateProfile);
authRouter.delete("/delete/:userId", AuthController.deleteUser);

export default authRouter;
