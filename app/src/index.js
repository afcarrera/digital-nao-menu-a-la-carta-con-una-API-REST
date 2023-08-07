const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const commentRoute = require("./controllers/comment");
const gradeRoute = require("./controllers/grade");
const restaurantRoute = require("./controllers/restaurant");

const app = express();
const port = process.env.PORT || 9000;
const version = '/api/v1'

// middlewares
app.use(express.json());
app.use(version, commentRoute);
app.use(version, gradeRoute);
app.use(version, restaurantRoute);

// routes
app.get('/', (req, res) => {
  res.send('Welcome to Tattler');
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error(error));

app.listen(port, () => console.log('server listening on port', port));