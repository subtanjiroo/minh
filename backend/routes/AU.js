const express = require("express");
const router = express.Router();
const usermidlle = require("../middleware/userAU");

router.get("/verifyLogin", usermidlle.verifyToken, async (req, res, next) => {
  try {
    res.status(200).send(req.userData);
  } catch (error) {
    next(err);
  }
});
module.exports = router;
