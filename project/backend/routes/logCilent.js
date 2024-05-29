const express = require("express");
const { getLC, addLC } = require("../controller/order_movie_service/addLC");

const router = express.Router();

router.get("/getLC", getLC);
router.post("/addLC", addLC);

module.exports = router;
