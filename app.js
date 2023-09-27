require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { errors } = require("celebrate");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { limiter } = require("./utils/constants");
const routes = require("./routes/index");

const errorHandler = require("./middlewares/error-handler");

const { PORT = 4000, DB_URL = "mongodb://127.0.0.1:27017/bitfilmsdb" } =
  process.env;

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect(DB_URL);

app.use(requestLogger);

app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
