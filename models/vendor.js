import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    lowercase: true,
  },
  phoneNumber: {
    type: Number,
    required: false,
    unique: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
    lowercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
