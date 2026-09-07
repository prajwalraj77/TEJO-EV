import express from "express";
import {addUser, loginUser} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", addUser);
authRouter.post("/login", loginUser);

export default authRouter;

