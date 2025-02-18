import express from "express";
import authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyPayment } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify-payment", verifyPayment)

export default orderRouter