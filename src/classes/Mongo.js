const mongoose = require("mongoose");
const Weather = require("../schemas/weather");
const WeatherData = mongoose.model("weatherData", Weather);

class Mongo {
  constructor(mongoURI) {
    const connectDB = async () => {
      try {
        await mongoose.connect(mongoURI);
      } catch (e) {
        console.error(e);
      }
    };
    connectDB();
  }

  // Insert weather data into DB
  insert = async (weatherData) => {
    const m = new WeatherData(weatherData);
    m.save();
    const { name, description, temp, wind } = weatherData;
    console.log(`Inserted ${name} | ${description} - ${temp} - ${wind}`);
  };

  // Get all weather data from DB
  getWeatherData = async () => {
    return WeatherData.find({});
  };
}

module.exports = Mongo;
