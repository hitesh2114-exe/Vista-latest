//This file basically for establishing connection between the backend and the mongdb atlas.
require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const mongodb_uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose
      .connect(mongodb_uri)
      .then(() => console.log("connection is established"));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
