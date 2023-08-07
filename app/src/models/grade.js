module.exports = class Grade{
  constructor(date, score) {
    this.date = new Date(Date.parse(date));
    this.score = score;
  }
}
