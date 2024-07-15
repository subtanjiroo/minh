const express = require("express");
const { getLO, addLO } = require("../controller/order_movie_service/addLO");

const router = express.Router();

router.get("/getLO", getLO);
router.post("/addLO", addLO);

module.exports = router;
