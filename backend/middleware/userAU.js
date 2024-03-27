const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const Client = require("../models/cilent");

module.exports = {
  verifyToken: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(200).send({
          code: 200,
          msg: "Token is missing or invalid!",
          data: authHeader,
        });
      }

      const token = authHeader.split(" ")[1];
      const decode = jwt.verify(token, process.env.PASS_JWT_SECRECT);
      req.userData = decode;

      if (req.userData) {
        const clientdata = await Client.findOne({ id: req.userData.id });
        req.userData = clientdata;
        next();
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).send({ code: 401, msg: "Token is invalid!" });
    }
  },
};
