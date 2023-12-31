const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
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
    type: [Object],
    required: false
  },
  grades: {
    type: [Object],
    required: false
  }
},
{ collection : 'restaurant' });

module.exports = mongoose.model('restaurant', restaurantSchema);