import { Router } from "express";
import orderItemController from "../controllers/orderItem.js";
const orderRouter = Router();

orderRouter.get("/", orderItemController.getOderItem);
orderRouter.get("/orders/:userId", orderItemController.getOder);
orderRouter.post("/:userId", orderItemController.addOrderItem);
orderRouter.delete("/:id", orderItemController.deleteOrder);

export default orderRouter;
