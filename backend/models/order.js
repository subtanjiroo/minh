const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: Number,
  movie_name: String,
  addition: Object,
  movie_time: String,
  room_number: String,
  seat: Object,
  price: Number,
  client_name: String,
  client_phone: String,
  client_email: String,
  isRegisted: Boolean,
  status_order: Number,
  status_order_des: String,
  payment_method: String,
  createdDate: Date,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
