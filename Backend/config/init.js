const mongoose = require("mongoose");
const Listing = require("../model/listing");
const initData = require("./data");
const connectDB = require("./db");

connectDB();

const init = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6a381ef6a7cffd63aaaaa207",
  }));
  await Listing.insertMany(initData.data);
  console.log("data uplaoded");
};

init();
