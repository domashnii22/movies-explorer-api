require("dotenv").config();

const SECRET_KEY =
  process.env.NODE_ENV === "production" ?
    process.env.SECRET_KEY :
    "some-secret-key";
const DB_URL = process.env.MONGO_DB || "mongodb://127.0.0.1:27017/bitfilmsdb";
const PORT = process.env.APP_PORT || 4000;

module.exports = {
  SECRET_KEY,
  PORT,
  DB_URL,
};
