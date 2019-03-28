const Order = require("../models/order");
const mongoose = require("mongoose");

exports.getHistory = async (req, res, next) => {
  const purchaserId = req.user.id;
  let all_orders = [];

  try {
    all_orders = await Order.find({
      purchaserId: mongoose.Types.ObjectId(purchaserId)
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
  res.json(all_orders);
};
