const express = require("express");
const reviewRouter = express.Router();
const Review = require("../model/review");
const review = require("../controllers/reviewController");
const { isLoggedIn } = require("../middleware");

reviewRouter.post("/listing/:id/review", isLoggedIn, review.createReview);
reviewRouter.delete("/listing/:id/reviews/:reviewId", isLoggedIn, review.deleteReview);

module.exports = reviewRouter;
