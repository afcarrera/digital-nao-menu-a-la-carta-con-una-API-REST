const express = require("express");
const gradeSchema = require("../models/grade");

const router = express.Router();
const errorStatusCode = 409;

// create grade
router.post("/grades", (req, res) => {
  const grade = gradeSchema(req.body);
  grade
    .save()
    .then((data) => res.json(data))
    .catch((error) => {
      res.status(errorStatusCode).send(error);
    });
});

module.exports = router;