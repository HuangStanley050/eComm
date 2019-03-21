const secretKey = process.env.STRIPE_KEY;
const stripe = require("stripe")(secretKey);

exports.makePayment = async (req, res, next) => {
  const token = req.body.token;
  const amount = req.body.amount;
  //console.log(amount);
  try {
    let result = await stripe.charges.create({
      amount: amount,
      source: token.id,
      currency: "usd"
    });
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
  //res.json(token);
};
