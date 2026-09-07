import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
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

    serviceType: {
      type: String,
      required: true,
      trim: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "in-progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const BookingModel = mongoose.model("Booking", bookingSchema);

export default BookingModel;