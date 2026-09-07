import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const addUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "All fields are required" });
    }

    const isUser = await UserModel.findOne({ email });

    if (isUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ success: false, message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      name,
      email,
      password: hashpassword,
      phone,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: "User Created" });
  } catch (err) {
    return res
    .status(400)
    .json({
      success: false,
      message: "Unable to create user",
      error: err.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "All fields are required" });
    }

    const isUser = await UserModel.findOne({ email });

    if (isUser) {
      const isPassword = await bcrypt.compare(password, isUser.password);

      if (isPassword) {
        const payload = {
          id: isUser._id,
          role: isUser.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        return res.status(StatusCodes.OK).json({
          success: true,
          message: "User logged in",
          token: token,
        });
      } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Invalid credentials",
        });
      }
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Unable to login user" });
  }
};
