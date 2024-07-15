const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: Array,
  description: String,
  releaseDate: String,
  duration: Number,
  actors: Array,
  author: String,
  timeStart: [{
    date: String,
    time: [{
      timeR: String,
      seats: [{
        seatNumber: String, // Thêm trường seatNumber vào schema
        isOccupied: Boolean
      }]
    }]
  }],
  img: String,
  price: String,
  chinhanh: Array,
  roomNumber: String,
  modifyDate: Date,
  createdDate: Date
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
