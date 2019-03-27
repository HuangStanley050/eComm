const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  //orders: [{ productId: { type: Schema.Types.ObjectId }, quantity: Number }],
  orders: [],
  purchaserId: Schema.Types.ObjectId,
  purchaserDetails: {
    name: String,
    email: String
  },
  date: String,
  total_amount: Number
});

module.exports = mongoose.model("Order", orderSchema);
