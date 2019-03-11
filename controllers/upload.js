const Product = require("../models/product");

exports.upLoad = async (req, res, next) => {
  //console.log(req.file);
  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    imageId: req.file.id
  });
  let result = await newProduct.save();
  res.json(result);
};
