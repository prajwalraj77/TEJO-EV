import ScooterModel from "../models/scooter.model.js";
import scooters from "../data/scooter.data.js";
import connectDB from "../config/MongoDB.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });


const SpeedScooter = async () => {
  try {
    await connectDB();
    for (let i = 0; i < scooters.length; i++) {
      const newScooter = scooters[i];
      const scoooter = await ScooterModel.create(newScooter);
    }
    console.log("Successfully added Scooter");
    return mongoose.connection.close();
  } catch (err) {
    console.log(err);
    return mongoose.connection.close();
  }
};

SpeedScooter();
