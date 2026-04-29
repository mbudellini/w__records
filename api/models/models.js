const mongoose = require("mongoose");

const DiscogsCollectionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  instance_id: {
    type: Number,
    required: true,
    unique: true,
  },
  date_added: {
    type: Date,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  price: {
    type: Number,
    min: 0,
    default: 0,
  },
  basic_information: {
    id: Number,
    master_id: Number,
    master_url: String,
    resource_url: String,
    thumb: String,
    cover_image: String,
    title: {
      type: String,
      required: true,
    },
    year: Number,
    formats: [
      {
        name: String,
        qty: String,
        descriptions: [String],
      },
    ],
    labels: [
      {
        name: String,
        catno: String,
        entity_type: String,
        entity_type_name: String,
        id: Number,
        resource_url: String,
      },
    ],
    artists: [
      {
        name: String,
        anv: String,
        join: String,
        role: String,
        tracks: String,
        id: Number,
        resource_url: String,
      },
    ],
    genres: [String],
    styles: [String],
  },
  folder_id: {
    type: Number,
    required: true,
  },
  notes: [
    {
      field_id: Number,
      value: String,
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { strictQuery: false }
);

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

const PaymentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const DiscogsCollection = mongoose.model("DiscogsCollection", DiscogsCollectionSchema);
const User = mongoose.model("users", UserSchema);
const Cart = mongoose.model("Cart", CartSchema);
const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = { DiscogsCollection, User, Cart, Payment };
