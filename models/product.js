const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
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

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);
