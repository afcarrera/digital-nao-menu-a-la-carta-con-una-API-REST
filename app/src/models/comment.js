const mongoose = require("mongoose");

module.exports = class Comment{
  constructor(comment) {
    this.date =  new Date();
    this.comment = comment;
    this._id = new mongoose.Types.ObjectId();
  }
}
