import express from "express";
import authMiddleware from '../middleware/auth.js';
import { placeOrder, userOrders, verifyPayment } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify-payment", verifyPayment);
orderRouter.post("/userorders", authMiddleware, userOrders);

export default orderRouter