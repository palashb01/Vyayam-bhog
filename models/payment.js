import mongoose from "mongoose";

const paymentModel = new mongoose.Schema({
  order: {
    type: mongoose.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  amount: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  paymentTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
});

const Payment = mongoose.model("Payment", paymentModel);

export default Payment;
