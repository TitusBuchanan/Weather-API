const morgan = require("morgan");

const Logger = require("./winston");

const stream = {
  write: (message) => Logger.http(message),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return false;
};

module.exports = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream, skip }
);
