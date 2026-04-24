const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  items: [
    {
      instance_id: {
        type: Number,
        required: true,
      },
      id: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      cover_image: String,
      added_date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", CartSchema);
