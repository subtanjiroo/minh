const mongoose = require("mongoose");

const logOrderSchema = new mongoose.Schema({
  id: Number,
  dataRequest: String,
  ipAddress: String,
  userAgent: String,
  contentType: String,
  userName: String,
  status: Number,
  status_order_desciption: String,
  createdDate: Date,
});

const logOrder = mongoose.model("logOrder", logOrderSchema);
module.exports = logOrder;
