const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  id: Number,
  roomNumber: String,
  seat: Array,
  modifyDate: Date,
  createdDate: Date,
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
