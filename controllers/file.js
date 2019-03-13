const Product = require("../models/product");
const mongoose = require("mongoose");

const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "product" });
});

exports.fetchProducts = (req, res, next) => {
  const pageNumber = req.query.page;

  Product.paginate({}, { page: pageNumber, limit: 3 })
    //result.totalDocs
    .then(result => res.json(result))
    .catch(err => next(err));
};

exports.getImage = (req, res, next) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  try {
    const download = gfs.openDownloadStream(id);
    return download.pipe(res);
  } catch (err) {
    next(err);
  }
};
