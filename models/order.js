const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  //orders: [{ productId: { type: Schema.Types.ObjectId }, quantity: Number }],
  orders: [],
  purchaser: { id: Schema.Types.ObjectId, name: String, email: String },
  date: String,
  total_amount: Number
});

module.exports = mongoose.model("Order", orderSchema);
