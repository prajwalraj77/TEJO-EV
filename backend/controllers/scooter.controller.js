import ScooterModel from "../models/scooter.model.js";
import { StatusCodes } from "http-status-codes";

export const getScooters = async (req, res) => {
  try {
    const allScooters = await ScooterModel.find();

    return res
      .status(StatusCodes.OK)
      .json({
        success: true,
        scooters: allScooters,
        message: "Fetched all scooter data",
      });
  } catch (err) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        success: false,
        message: "Unable to fetch scooter data",
      });
  }
};

export const getScooterById = async (req, res) => {
  try {
    const { id } = req.params;

    const scooter = await ScooterModel.findById(id);

    if (!scooter) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({
          success: false,
          message: "Scooter not found",
        });
    }

    return res
      .status(StatusCodes.OK)
      .json({
        success: true,
        scooter,
        message: "Scooter fetched successfully",
      });
  } catch (err) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        success: false,
        message: "Unable to fetch scooter",
      });
  }
};