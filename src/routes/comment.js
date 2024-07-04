import { Router } from "express";
import CommentController from "../controllers/comment.js";

const commentRouter = Router();

commentRouter.get("/", CommentController.getAll);
commentRouter.get("/:productId", CommentController.getDetail);
commentRouter.post("/", CommentController.createComment);
commentRouter.put("/:id", CommentController.updateComment);
commentRouter.delete("/:id", CommentController.deleteComment);

export default commentRouter;
