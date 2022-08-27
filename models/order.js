import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderTime: {
    type: Date,
    default: DateTime.now,
    required: true,
  },
  totalAmount: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  orderStatus: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
