const express = require("express");
const restaurantSchema= require("../models/restaurant");

const router = express.Router();
const errorStatusCode = 409;

// create restaurant
router.post("/restaurants", (req, res) => {
  const restaurant = restaurantSchema(req.body);
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

// update a restaurant
router.put("/restaurants/:id", (req, res) => {
  const { id } = req.params;
  const { cuisine, borough, name } = req.body;
  restaurantSchema
    .updateOne({ _id: id }, { $set: { cuisine, borough, name } })
    .then((data) => res.json(data))
    .catch((error) => {
      res.status(errorStatusCode).send(error);
    });
});

module.exports = router;