import mongoose from "mongoose";

const premiumUserSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateOfActivation: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dateOfExpiration: {
    type: Date,
    required: true,
  },

  //TODO: Redundant if we are having expiration date
  isActive: {},
});

const PremiumUser = mongoose.model("PremiumUser", premiumUserSchema);

export default PremiumUser;
