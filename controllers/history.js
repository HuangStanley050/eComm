const Order = require("../models/order");
//const mongoose = require("mongoose");

exports.getHistory = async (req, res, next) => {
  const purchaserId = req.user.id;
  let all_orders = [];
  let history = [];
  try {
    all_orders = await Order.find();
    all_orders.forEach(order => {
      if (order.purchaserId.toString() === purchaserId) {
        history.push(order);
      }
    });
    console.log(history);
  } catch (err) {
    console.log(err);
    next(err);
  }
  res.json(history);
};
