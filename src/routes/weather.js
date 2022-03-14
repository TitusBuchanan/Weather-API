const express = require("express");
const Mongo = require("../classes/Mongo");
const weatherService = require("../services/weatherService");

const router = express.Router();

// Get Weather Data from DB
router.get("/", async (req, res) => {
  // Connect to MongoDB
  const mongodb = await new Mongo(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.mti9k.mongodb.net/`
  );
  const data = await mongodb.getWeatherData();
  data.forEach((item) => {
    const { name, description, temp, wind } = item;
    console.log(`Retrieved ${name} | ${description} - ${temp} - ${wind}`);
  });
  res.send(data);
});

// Post Weather Data to DB
router.post("/", async (req, res) => {
  // Get Weather Data
  const data = await weatherService.getWeatherData();

  // Connect to MongoDB
  const mongodb = await new Mongo(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.mti9k.mongodb.net/`
  );

  // insert items to DB
  await data.forEach((item) => mongodb.insert(item));

  res.status(200).send(data);
});

module.exports = router;
