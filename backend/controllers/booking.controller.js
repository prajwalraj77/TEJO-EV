import BookingModel from "../models/booking.model.js";

const addbooking = async (req, res) => {
  try {
    const { scooter, serviceType, bookingDate, amount } = req.body;
    const isUser = req.userID;

    if (!isUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const newBooking = await BookingModel.create({
      scooter,
      user: req.userID,
      serviceType,
      bookingDate,
      amount,
    });
    return res.status(201).json({ success: true, message: " Booking created" });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: " Unabel to create booking" ,error: err.message});
  }
};

export default addbooking;
