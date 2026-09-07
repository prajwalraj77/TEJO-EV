import {getScooters, getScooterById} from "../controllers/scooter.controller.js"
import express from "express"


const scooterRouter = express.Router();

scooterRouter.get("/", getScooters);
scooterRouter.get("/:id", getScooterById);

export default scooterRouter;
