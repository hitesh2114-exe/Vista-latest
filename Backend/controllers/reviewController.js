const Review = require("../model/review");
const Listing = require("../model/listing");
const mongoose = require("mongoose");

const createReview = async (req, res) => {
  let { id } = req.params;
  const { comment, rating } = req.body;

  const listing = await Listing.findById(id); //finding the listing
  const newReview = new Review({
    //creating the new review
    comment,
    rating,
  });
  newReview.author = req.user._id;

  listing.reviews.push(newReview); //adding the review to the particular listing

  console.log(newReview);
  await newReview.save();
  await listing.save();
  res.send(listing);
};

const deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;

  let reqId = req.user._id;
  let listing = await Listing.findById(id);
  let review = await Review.findById(reviewId);

  if ((!listing.owner?._id.equals(reqId)) && (!review.author?._id.equals(reqId))) {
    return res.status(403).json({
      message: "You are not authorized to delete this review",
    });
  }

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.send("successfully deleted");
};

module.exports = { createReview, deleteReview };
