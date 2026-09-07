import addbooking from "../controllers/booking.controller.js";
import { verifyToken } from "../middleware.js";
import express from "express"


const bookingRouter = express.Router();

bookingRouter.post("/", verifyToken, addbooking);

export default bookingRouter;
