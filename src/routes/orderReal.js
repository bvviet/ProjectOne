import { Router } from "express";
import OrderItemController from "../controllers/orderReal.js";

const orderRealRouter = Router();

orderRealRouter.post("/", OrderItemController.createOrder);
orderRealRouter.get("/:id", OrderItemController.getDetailOrder);
orderRealRouter.delete("/:id", OrderItemController.deleteOrder);

export default orderRealRouter;
