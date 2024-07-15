const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: Number,
  movie_name: String,
  addition: Array,
  movie_time: String,
  room_number: String,
  seat: Array,
  timeStart:Array,
  price: Number,
  client_name: String,
  client_phone: String,
  client_email: String,
  isRegisted: Boolean,
  status_order: Number,
  total: Number,
  status_order_des: String,
  payment_method: String,
  chinhanh:Array,
  createdDate: Date,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
