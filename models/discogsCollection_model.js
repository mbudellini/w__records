const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

const DiscogsCollection = mongoose.model(
  "DiscogsCollection",
  DiscogsCollectionSchema,
);
module.exports = DiscogsCollection;
