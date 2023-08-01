const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
    required: true
  },
  restaurant_id: {
    type: String,
    required: true
  }
},
{ collection : 'comment' });

module.exports = mongoose.model('comment', commentSchema);