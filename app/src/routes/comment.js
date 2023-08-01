const express = require("express");
const commentSchema = require("../models/comment");

const router = express.Router();
const errorStatusCode = 409;

// create comment
router.post("/comments", (req, res) => {
  const comment = commentSchema(req.body);
  comment
    .save()
    .then((data) => res.json(data))
    .catch((error) => {
        res.status(errorStatusCode).send(error);
      });
});

module.exports = router;