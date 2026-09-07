import Razorpay from "razorpay";
import crypto from "crypto";
import { StatusCodes } from "http-status-codes";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Payment order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create Razorpay Order Error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Unable to create payment order",
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Payment verification details are required",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Payment Verification Error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Unable to verify payment",
    });
  }
};