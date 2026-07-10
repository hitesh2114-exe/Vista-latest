const express = require("express");
const mainRouter = express.Router();
const listingRouter = require("./listingRoute");
const userRouter = require("./userRoute");
const reviewRouter = require("./reviewRoute");
const reservationRouter = require("./reservationRoute");

mainRouter.use(listingRouter);
mainRouter.use(userRouter);
mainRouter.use(reviewRouter);
mainRouter.use(reservationRouter);

mainRouter.get("/", (req, res) => {
  res.send("Welcome!");
});

module.exports = mainRouter;
