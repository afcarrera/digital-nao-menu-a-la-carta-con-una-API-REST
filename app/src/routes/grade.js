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

// get all grades
router.get("/grades", (req, res) => {
  
  const sort = handleQuerySort(req.query.sort)
  gradeSchema
    .find()
    .sort(sort)
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