import VehicleModel from "../models/vehicle.model.js";
import ScooterModel from "../models/scooter.model.js";
import { StatusCodes } from "http-status-codes";

export const addVehicle = async (req, res) => {
  try {
    const { vehicleId, scooter } = req.body;

    if (!vehicleId || !scooter) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Vehicle ID and scooter are required",
      });
    }

    const existingVehicle = await VehicleModel.findOne({ vehicleId });

    if (existingVehicle) {
      return res.status(StatusCodes.CONFLICT).json({
        success: false,
        message: "Vehicle already exists",
      });
    }

    const existingScooter = await ScooterModel.findById(scooter);

    if (!existingScooter) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Scooter not found",
      });
    }

    const newVehicle = await VehicleModel.create({
      vehicleId,
      user: req.userID,
      scooter,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Vehicle created successfully",
      vehicle: newVehicle,
    });
  } catch (error) {
    console.error("Add Vehicle Error:", error);

    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Unable to create vehicle",
      error: error.message,
    });
  }
};