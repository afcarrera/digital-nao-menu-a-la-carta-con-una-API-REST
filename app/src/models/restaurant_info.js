const mongoose = require("mongoose");
const comment = require("./comment");
const grade = require("./grade");

const restaurantInfoSchema = mongoose.Schema({
  cuisine: {
    type: String,
    required: true,
  },
  borough: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  restaurant_id: {
    type: String,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  comments: {
    type: [comment.Schema],
    required: false
  },
  grades: {
    type: [grade.Schema],
    required: false
  }
},
{ collection : 'restaurant_info' });

module.exports = mongoose.model('restaurant_info', restaurantInfoSchema);