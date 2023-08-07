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
    const gradeObj = new Grade(grade.score);
    gradesArrReq.push(gradeObj);
  });
  restaurant.grades.length  = 0
  gradesArrReq.forEach(grade => {
    const gradeObj = new Grade(grade.score);
    restaurant.grades.push(gradeObj);
  });

  commentsArrReq = []
  restaurant.comments.forEach(comment => {
    const commentObj = new Comment(comment.comment);
    commentsArrReq.push(commentObj);
  });
  restaurant.comments.length  = 0
  commentsArrReq.forEach(comment => {
    const commentObj = new Comment(comment.comment);
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


// get all restaurants by filter
router.post("/restaurants/filter", (req, res) => {  
  const sort = handleQuerySort(req.query.sort);
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
  stages = []
  stages.push({
    '$match': restaurantFilter
  });
  if (req.query.sort != undefined){
    stages.push({
      '$sort': sort
    });
  }
  restaurantSchema
    .aggregate(stages)
    .then((data) => res.json(data))
    .catch((error) => {
      res.status(errorStatusCode).send(error);
    });
});

// geoloc a restaurant
router.post("/restaurants/filter-by-dist",(req, res) => {
  const { x, y, dist} = req.body;
  restaurantSchema.aggregate([
    {
      '$geoNear': {
        'near': {
          'type': 'Point', 
          'coordinates': [
            x, y
          ]
        }, 
        'distanceField': 'distance', 
        'maxDistance': dist
      }
    }
  ])
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