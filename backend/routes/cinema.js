const express = require("express");
const {
  getMovie,
  addMovie,
} = require("../controller/order_movie_service/movie");
const {
  createOrder,
} = require("../controller/order_movie_service/order_service");
const router = express.Router();

router.get("/get_movie", getMovie);
router.post("/add_movie", addMovie);
router.post("/create_order", createOrder);

module.exports = router;
