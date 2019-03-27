const secretKey = process.env.STRIPE_KEY;
const Order = require("../models/order");
//const User = require("../models/user");
const stripe = require("stripe")(secretKey);
const mongoose = require("mongoose");

exports.makePayment = async (req, res, next) => {
  const { token, amount, products } = req.body;

  const orders = products.map(product => ({
    productId: product._id,
    quantity: product.quantity
  }));

  const purchaserId = mongoose.Types.ObjectId(req.user._id);

  const purchaserDetails = {
    name: req.user.name,
    email: req.user.email
  };

  const time = new Date().toUTCString();

  try {
    let result = await stripe.charges.create({
      amount: amount,
      source: token.id,
      currency: "usd"
    });
    let order = new Order({
      orders,
      purchaserId,
      purchaserDetails,
      date: time,
      total_amount: amount
    });
    order.save();
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
