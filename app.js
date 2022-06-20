require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/books", require("./controller/books"));

// "/" Path sends hello world
app.get("/", (req, res) => {
  res.send("Hello world");
});

// listen on port 3000
app.listen(3000);
