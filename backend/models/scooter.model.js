import mongoose from "mongoose";

const scooterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    rangeMin: {
      type: Number,
      required: true,
    },

    rangeMax: {
      type: Number,
      required: true,
    },

    batteryCapacity: {
      type: Number,
      required: true,
    },

    topSpeed: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ScooterModel = mongoose.model("Scooter", scooterSchema);

export default ScooterModel;