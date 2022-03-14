const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Weather = new Schema({
  name: String,
  description: String,
  temp: String,
  wind: String,
});

module.exports = Weather;
