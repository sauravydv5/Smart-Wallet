const express = require("express");
const logger = require("./middlewares/logger.middleware");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());
app.use(logger);

// routes later
app.use(errorHandler);

module.exports = app;
