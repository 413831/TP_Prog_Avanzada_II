const mongoose = require("mongoose");
require('dotenv').config({ path: '.env' });
const MONGO_URI = process.env.ATLAS_URI || undefined;
const DB_NAME = process.env.MONGO_DB_NAME ;

console.log(MONGO_URI)

mongoose
  .connect(MONGO_URI, {
    dbName: DB_NAME
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
