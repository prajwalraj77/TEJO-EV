import express from "express";
import {
    createOrder,
    verifyPayment,
} from "../controllers/payment.controller.js";
import { verifyToken } from "../middleware.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", verifyToken, createOrder);

paymentRouter.post("/verify", verifyToken, verifyPayment);

export default paymentRouter;