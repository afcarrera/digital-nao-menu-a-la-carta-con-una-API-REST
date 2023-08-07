const express = require("express");
const restaurantSchema = require("../models/restaurant");
const Grade = require("../models/grade");

const router = express.Router();
const errorStatusCode = 409;

// add grade
router.post("/restaurants/:id/grades", (req, res) => {
  const { id } = req.params;
  const { score } = req.body;
  const gradeObj = new Grade(score);
  restaurantSchema
    .updateOne({ _id: id }, { $push: { grades: gradeObj} })
    .then((data) => res.json(data))
    .catch((error) => {
        res.status(errorStatusCode).send(error);
      });
});


module.exports = router;