const express = require("express");
const restaurantSchema = require("../models/restaurant");
const Comment = require("../models/comment");

const router = express.Router();
const errorStatusCode = 409;

// add comment
router.post("/restaurants/:id/comments", (req, res) => {
  const { id } = req.params;
  const { date, comment } = req.body;
  const commentObj = new Comment(date, comment);
  restaurantSchema
    .updateOne({ _id: id }, { $push: { comments: commentObj} })
    .then((data) => res.json(data))
    .catch((error) => {
        res.status(errorStatusCode).send(error);
      });
});

module.exports = router;