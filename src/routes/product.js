import { Router } from "express";
import ProductController from "../controllers/product.js";

const productRouter = Router();

productRouter.get("/search", ProductController.searchProduct);
productRouter.get("/", ProductController.getAll);
productRouter.get("/:id", ProductController.getDetail);
productRouter.get("/categories/:categoryId", ProductController.getProductsByCategory);
productRouter.post("/", ProductController.createProduct);
productRouter.put("/:id", ProductController.updateProduct);
productRouter.delete("/:id", ProductController.deleteProduct);

export default productRouter;
