const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: Number,
  title: String,
  category: Array,
  description: String,
  releaseDate: String,
  time: Number,
  actors: Array,
  author: String,
  img: String,
  modifyDate: Date,
  createdDate: Date,
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
