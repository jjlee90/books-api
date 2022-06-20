const express = require("express");
const books = express.Router();
const Book = require("../models/books.js");

books.get("/seed", (req, res) => {
  Book.insertMany([
    {
      title: "The Shinobi Initiative",
      description:
        "The reality-bending adventures of a clandestine service agency in the year 2166",
      year: 2014,
      quantity: 10,
      imageURL: "https://imgur.com/LEqsHy5.jpeg",
    },
    {
      title: "Tess the Wonder Dog",
      description: "The tale of a dog who gets super powers",
      year: 2007,
      quantity: 3,
      imageURL: "https://imgur.com/cEJmGKV.jpg",
    },
    {
      title: "The Annals of Arathrae",
      description:
        "This anthology tells the intertwined narratives of six fairy tales.",
      year: 2016,
      quantity: 8,
      imageURL: "https://imgur.com/VGyUtrr.jpeg",
    },
    {
      title: "Wâˆ€RP",
      description:
        "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
      year: 2010,
      quantity: 4,
      imageURL: "https://imgur.com/qYLKtPH.jpeg",
    },
  ])
    .then(
      res.status(200).json({
        message: "Seed successful",
      })
    )
    .catch(
      res.status(400).json({
        message: "Seed unsuccessful",
      })
    );
});

// index
books.get("/", (req, res) => {
  Book.find().then((books) => {
    console.log({ books });
    res.json({ books });
  });
});

// get book by id
books.get("/:id", (req, res) => {
  Book.findById(req.params.id)
    .then((getBook) => {
      console.log({ getBook });
      res.status(200).json({ Book: getBook });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "error404" });
    });
});

// update book
books.put("/:id", (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body)
    .then((updateBook) => {
      res.status(200).json({ updateBook });
    })
    .catch((err) => {
      res.status(404).json({ message: "error404" });
    });
});

// delete book
books.delete("/:id", (req, res) => {
  Book.findOneAndDelete(req.params.id)
    .then((deleteBook) => {
      res.status(200).json({ message: deleteBook.id + " has been deleted" });
    })
    .catch((err) => {
      res.status(404).json({ message: "error404" });
    });
});

// create book
books.post("/", (req, res) => {
  Book.create(req.body)
    .then((newBook) => {
      res.status(200).json({ Book: newBook });
    })
    .catch((err) => {
      res.status(404).json({ message: "error404" });
    });
});

module.exports = books;
