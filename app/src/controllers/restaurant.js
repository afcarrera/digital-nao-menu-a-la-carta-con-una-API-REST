const express = require("express");
const restaurantSchema = require("../models/restaurant");
const Comment = require("../models/comment");
const Grade = require("../models/grade");
const router = express.Router();
const errorStatusCode = 409;

// create restaurant
router.post("/restaurants", (req, res) => {
  const restaurant = restaurantSchema(req.body);
  
  gradesArrReq = []
  restaurant.grades.forEach(grade => {
    const gradeObj = new Grade(grade.date, grade.score);
    gradesArrReq.push(gradeObj);
  });
  restaurant.grades.length  = 0
  gradesArrReq.forEach(grade => {
    const gradeObj = new Grade(grade.date, grade.score);
    restaurant.grades.push(gradeObj);
  });

  commentsArrReq = []
  restaurant.comments.forEach(comment => {
    const commentObj = new Comment(comment.date, comment.comment);
    commentsArrReq.push(commentObj);
  });
  restaurant.comments.length  = 0
  commentsArrReq.forEach(comment => {
    const commentObj = new Comment(comment.date, comment.comment);
    restaurant.comments.push(commentObj);
  });

  restaurant
    .save()
    .then((data) => res.json(data))
    .catch((error) => {
      res.status(errorStatusCode).send(error);
    });
});

// get all restaurants
router.get("/restaurants", (req, res) => {
  restaurantSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => {
      res.status(errorStatusCode).send(error);
    });
});

// get a restaurant
router.get("/restaurants/:id", (req, res) => {
  const { id } = req.params;
  restaurantSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => {
      res.status(errorStatusCode).send(error);
    });
});

// update a restaurant
router.patch("/restaurants/:id", (req, res) => {
  const { id } = req.params;
  const { cuisine, borough, name } = req.body;
  restaurantSchema
    .updateOne({ _id: id }, { $set: { cuisine, borough, name } })
    .then((data) => res.json(data))
    .catch((error) => {
      res.status(errorStatusCode).send(error);
    });
});

// delete a restaurant
router.delete("/restaurants/:id", (req, res) => {
  const { id } = req.params;
  restaurantSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => {
      res.status(errorStatusCode).send(error);
    });
});

module.exports = router;