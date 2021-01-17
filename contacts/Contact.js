const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: (value) => value.includes("@"),
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  subscription: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
