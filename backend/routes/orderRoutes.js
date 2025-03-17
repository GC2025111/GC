import express from "express";
import { createOrder, createOrderStripe, verifyStripeOrder, userOrders, allOrders, updateOrderStatus } from "../controllers/orderController.js";

const orderRouter = express.Router();
orderRouter.post("/create-order",createOrder);
orderRouter.post("/create-order-stripe",createOrderStripe);
orderRouter.get("/userorders/:userId",userOrders);
orderRouter.put("/update-order-status",updateOrderStatus);
orderRouter.get("/allorders",allOrders);
orderRouter.post("/verify-stripe-order",verifyStripeOrder);
export default orderRouter;
