const express = require("express");
const Client = require("../controller/order_movie_service/cilentIF");
const router = express.Router();

router.post("/login", Client.loginClient);
router.post("/register", Client.registerClient);

module.exports = router;
