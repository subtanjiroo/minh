const express = require("express");
const {
  getMovie,
  addMovie,
 
} = require("../controller/order_movie_service/movie");
const {
  createOrder,LS
} = require("../controller/order_movie_service/order_service");
const {
  getMovieList,
  getCategory,
  updateMovie,
  DeleteMovie
} = require("../controller/order_movie_service/movie");
const router = express.Router();

router.get("/get_movie", getMovie);
router.post("/add_movie", addMovie);
router.post("/create_order", createOrder);
router.post("/LS", LS);
router.post("/get_movie_list", getMovieList);
router.post("/get_category", getCategory);
router.post("/UdM", updateMovie);
router.post("/Delete", DeleteMovie);


module.exports = router;
