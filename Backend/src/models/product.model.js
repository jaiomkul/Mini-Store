const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, required: true },
    gender: { type: String, required: true },
    original_price: { type: Number, required: true },
    final_price: { type: Number, required: true },
    images: { type: [String], required: true },
    sizes: { type: [Number], required: true },
    reviews: { type: [Number], required: true },
    rating: { type: [Number], required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
