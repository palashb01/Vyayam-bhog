import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  minAmount: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  maxAmount: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  percentage: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
