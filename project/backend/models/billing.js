const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  id: Number,
  order_id: Number,
  cilentName: String,
  total: Number,
  card_number: Number,
  expired_month: String,
  expired_year: String,
  bank: String,
  card_type:String,
  createdDate: Date,
});

const Bill = mongoose.model("Bill", BillSchema);
module.exports = Bill;
