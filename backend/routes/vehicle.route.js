import express from "express";
import { addVehicle } from "../controllers/vehicle.controller.js";
import { verifyToken } from "../middleware.js";

const vehicleRouter = express.Router();

vehicleRouter.post("/", verifyToken, addVehicle);

export default vehicleRouter;