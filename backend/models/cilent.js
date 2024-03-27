const mongoose = require("mongoose");

const cilentSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  phone_number: String,
  BoD: Date,
  adress: String,
  password: String,
  role: Array,
  modifyDate: Date,
  createdDate: Date,
});

const cilent = mongoose.model("cilent", cilentSchema);
module.exports = cilent;
