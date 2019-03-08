const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  imageId: {
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model("Product", productSchema);
