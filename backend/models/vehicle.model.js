import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    scooter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scooter",
      required: true,
    },

    batteryLevel: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
    },

    speed: {
      type: Number,
      default: 0,
      min: 0,
    },

    temperature: {
      type: Number,
      default: 25,
    },

    latitude: {
      type: Number,
    },

    longitude: {
      type: Number,
    },

    status: {
      type: String,
      enum: ["online", "offline", "charging"],
      default: "offline",
    },
  },
  {
    timestamps: true,
  }
);

const VehicleModel = mongoose.model("Vehicle", vehicleSchema);

export default VehicleModel;