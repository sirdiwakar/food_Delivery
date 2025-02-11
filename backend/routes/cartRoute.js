import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";
const cartRouter = express.Router();

cartRouter.patch("/add",authMiddleware, addToCart);
cartRouter.patch("/remove",authMiddleware, removeFromCart);
cartRouter.get("/get",authMiddleware, getCart);

export default cartRouter;
