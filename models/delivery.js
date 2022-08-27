import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  order: {
    type: mongoose.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },

  //TODO: CHECK if there is a need of driver of delivery partner model
  driver: {
    type: String,
    required: true,
  },

});

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;
