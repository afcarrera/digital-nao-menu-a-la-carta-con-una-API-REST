const mongoose = require("mongoose");

const gradeSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  score: {
    type: Number,
    required: true
  },
  restaurant_id: {
    type: String,
    required: true
  }
},
{ collection : 'grade' });

module.exports = mongoose.model('grade', gradeSchema);