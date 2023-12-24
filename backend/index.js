const express = require("express");
// const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const authController = require("./controllers/authController");
const uploadController = require("./controllers/uploadController");
const movieController = require("./controllers/movieController"); // Adjust the path accordingly

// db connecting
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () => console.log("Db is connected"));
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("/backend/images"));

app.use("/auth", authController);
app.use("/upload", uploadController);
app.use("/movies", movieController);


// starting server
const port = process.env.PORT || 5000;
module.exports = app.listen(port, () => console.log("Server has been started"));
