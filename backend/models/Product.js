const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  discount: {
    type: Number,
    default: 0
  },

  finalPrice: {
    type: Number
  },

  image: {
    type: String
  }
});

module.exports = mongoose.model("Product", productSchema);