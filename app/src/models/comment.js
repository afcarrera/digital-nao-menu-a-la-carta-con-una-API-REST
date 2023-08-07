const mongoose = require("mongoose");

module.exports = class Comment{
  constructor(date, comment) {
    this.date =  new Date(Date.parse(date));
    this.comment = comment;
    this._id = new mongoose.Types.ObjectId();
  }
}
