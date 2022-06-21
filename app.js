const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

require("dotenv").config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/books", require("./controller/books"));

// "/" Path sends hello world
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(process.env.PORT);
