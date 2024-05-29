const mongoose = require("mongoose");

const logCilentSchema = new mongoose.Schema({
  id: Number,
  action: String,
  ipadress: String,
  user_agent: String,
  content_type: String,
  username: String,
  createdDate: Date,
});

const cilent = mongoose.model("logCilent", logCilentSchema);
module.exports = cilent;
