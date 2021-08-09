const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");


const indexRouter = require("./routes/index");

const app = express();

const MONGODB_URI=process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
useNewUrlParser: true, 
useUnifiedTopology: true}).then(() => console.log("Mongoose connect to local database"))

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;
