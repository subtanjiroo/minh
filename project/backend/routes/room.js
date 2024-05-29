const express = require("express");
const {
  addRoom,
  getRoom,
} = require("../controller/order_movie_service/addRoom");
const router = express.Router();
router.get("/getR", getRoom);
router.post("/addR", addRoom);
module.exports = router;
