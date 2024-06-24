const mongoose = require("mongoose");
const { Schema } = mongoose;

const ratingSchema = new Schema({
  stars: { type: Number, min: [0, "wrong rating"], max: [5, "wrong rating"] },
  count: { type: Number, min: [0, "wrong count"] },
});

const productSchema = new Schema({
  image: { type: String, required: [true, "no image"] },
  company: { type: String, required: [true, "no company"] },
  item_name: {
    type: String,
    required: [true, "no item_name"],
    unique: [true, "not unique"],
  },
  original_price: { type: Number, min: [0, "wrong original price"] },
  current_price: { type: Number, min: [0, "wrong current price"] },
  discount_percentage: { type: Number, min: [0, "wrong discount"] },
  return_period: { type: Number, min: [0, "wrong return period"] },
  delivery_date: { type: String },
  rating: ratingSchema,
});

exports.Product = mongoose.model("Product", productSchema);
