const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  id: Number,
  order_id: Number,
  cilentName: String,
  price: Number,
  card_number: String,
  expired_month: String,
  expired_year: String,
  bank: String,
  card_type: String,
  transaction_price: Number,
  createdDate: Date,
});

const Bill = mongoose.model("Bill", BillSchema);
module.exports = Bill;
