const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cinemaRoute = require("./routes/cinema");
const cilentRoute = require("./routes/cilents");
const roomRoute = require("./routes/room");
// const orderRoute = require("./routes/order");
const LCRoute = require("./routes/logCilent");
const LORoute = require("./routes/logOrder");
const AUU = require("./routes/AU");
const db = require("./config/Database");
const app = express();

// Define a route
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
dotenv.config();

app.use("/movie_order", cinemaRoute);
app.use("/cilentIF", cilentRoute);
app.use("/Room", roomRoute);
// app.use("/Order", orderRoute);
app.use("/logCilent", LCRoute);
app.use("/logOrder", LORoute);
app.use("/AUUser", AUU);
app.get("/", (req, res) => {
  res.send("Hello, Express.js!");
});
const port = process.env.PORT;

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
