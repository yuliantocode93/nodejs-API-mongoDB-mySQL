const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true],
    minlength: [3],
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
    min: 100000,
    max: 1000000000,
  },
  stock: Number,
  status: {
    type: Boolean,
    default: true,
  },

  Image_url: {
    type: String,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
