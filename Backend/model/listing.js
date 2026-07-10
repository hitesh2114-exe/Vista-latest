const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("../model/review");
const Reservation = require("../model/reservation");

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      url: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      filename: String,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
    await Reservation.deleteMany({
      listing: listing._id,
    });
  }
});
/*
Above function is used to delete all the reviews of a particular listing that we are deleting.
All the reviewId(_id) present in listing.reviews is checked in Review collections and delete all those reviews whose id is present in listing.reviews
*/

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
