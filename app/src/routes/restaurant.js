const express = require("express");
const restaurantSchema = require("../models/restaurant");
const restaurantInfoSchema = require("../models/restaurant_info")
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
router.post("/restaurants/filter", (req, res) => {
  const restaurant = restaurantSchema(req.body);
  const restaurantFilter = {};
  if (restaurant.borough){
    restaurantFilter.borough = restaurant.borough;
  }
  if (restaurant.name){
    restaurantFilter.name = restaurant.name;
  }
  if (restaurant.cuisine){
    restaurantFilter.cuisine = restaurant.cuisine;
  }
  if (restaurant.restaurant_id){
    restaurantFilter.restaurant_id = restaurant.restaurant_id;
  }
  const sort = handleQuerySort(req.query.sort)
  restaurantSchema
    .find(restaurantFilter)
    .sort(sort)
    .then((data) => res.json(data))
    .catch((error) => {
      res.status(errorStatusCode).send(error);
    });
});

// get a restaurant
router.get("/restaurants/:id", (req, res) => {
  const { id } = req.params;
  restaurantInfoSchema
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

const handleQuerySort = (query) => {
  try{
    // convert the string to look like json object
    // example "id: -1, name: 1" to "{ "id": -1, "name": 1 }"
    const toJSONString = ("{" + query + "}").replace(/(\w+:)|(\w+ :)/g, (matched => {
        return '"' + matched.substring(0, matched.length - 1) + '":';
    }));
    return JSON.parse(toJSONString);
  }catch(err){
    return JSON.parse("{}"); // parse empty json if the clients input wrong query format
  }
}

module.exports = router;