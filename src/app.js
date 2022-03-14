const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const createError = require("http-errors");
const morganMiddleware = require("./config/morgan");
const Logger = require("./config/winston");

// Get config vars
dotenv.config();

const app = express();
app.use(morganMiddleware);

const router = express.Router();
app.use(router);

// CORS Config
const options = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false,
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Authorization, X-Request-With"
  );
  res.header("Access-Control-Max-Age", "86400");
  res.header("Access-Control-Expose-Headers", "Content-Length, X-JSON");
  res.header("Content-Type", "application/json");
  next();
});

app.use(cors(options));

app.options("*", cors(options));

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const weatherController = require("./routes/weather");
app.use("/weather", weatherController);

// Error Handling
app.use((req, res, next) => {
  next(createError(404));
});

// Server Logging
app.use(function (err, req, res, next) {
  Logger.error(
    `${req.method} - ${err.message}  - ${req.originalUrl} - ${req.ip}`
  );
  next(err);
});

// Server Start
app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
});
