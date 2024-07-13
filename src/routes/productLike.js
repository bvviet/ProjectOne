import { Router } from "express";
import productLike from "../controllers/productLike.js";

const productLikeRouter = Router();

productLikeRouter.get("/:userId", productLike.getAllFavorite);
productLikeRouter.post("/", productLike.createFavorite);
productLikeRouter.delete("/:productId", productLike.deleteFavorite);

export default productLikeRouter;
