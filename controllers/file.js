const Product = require("../models/product");
exports.fetchProducts = (req, res, next) => {
  const pageNumber = req.query.page;

  Product.paginate({}, { page: pageNumber, limit: 3 })
    //result.totalDocs
    .then(result => res.json(result))
    .catch(err => next(err));
};
