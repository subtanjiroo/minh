const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatNumber: String,
  isOccupied: Boolean
});

const roomSchema = new mongoose.Schema({
  id: Number,
  roomNumber: String,
  seats: [seatSchema], // Sử dụng schema riêng cho mảng seats
  modifyDate: Date,
  createdDate: Date,
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
