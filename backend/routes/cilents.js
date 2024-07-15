const express = require("express");
const Client = require("../controller/order_movie_service/cilentIF");
const router = express.Router();

router.post("/login", Client.loginClient);
router.post("/register", Client.registerClient);
router.get("/list",Client.ShowClient)
router.post("/deleteC", Client.DeleteC);
router.post("/SADD", Client.setAD);
router.post("/SOO", Client.showone);
router.post("/DPS", Client.DPS);
router.post("/UHS", Client.UHS);
module.exports = router;
