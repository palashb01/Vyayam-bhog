import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
  gender: {
    type: String,
    required: false,
    lowercase: true,
    trim: true,
  },
  dob: {
    type: Date,
    max: Date.now(),
  },
  isPremium: {
    type: Boolean,
    required: true,
  },
  Orders: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Order",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
