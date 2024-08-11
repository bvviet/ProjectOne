import { Router } from "express";
import category from "../controllers/category.js";

const categoriesRouter = Router();

categoriesRouter.get("/", category.getAllCategories);
categoriesRouter.get("/:id", category.getDetailCategories);
categoriesRouter.post("/", category.createCategories);
categoriesRouter.put("/:id", category.updateCategories);
categoriesRouter.delete("/:id", category.deleteCategories);

export default categoriesRouter;
