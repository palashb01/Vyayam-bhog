import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema({
  order: {
    type: mongoose.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  amount: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const OrderDetail = mongoose.model("OrderDetail", orderDetailSchema);

export default OrderDetail;
