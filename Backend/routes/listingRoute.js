const express = require("express");
const listingRouter = express.Router();
const Listing = require("../model/listing");
const listing = require("../controllers/listingControllers");
const { isLoggedIn } = require("../middleware");

// console.log(storage);

listingRouter.get("/listing/all", listing.index);
listingRouter.get(
  "/listing/user",
  isLoggedIn,
  listing.showAllListingOfLoggedInUser
);
listingRouter.post("/listing/create", isLoggedIn, listing.createListing);
listingRouter.put("/listing/update", isLoggedIn, listing.editListing);
listingRouter.get("/listing/:id", listing.show);
listingRouter.delete("/listing/delete/:id", isLoggedIn, listing.deleteListing);

module.exports = listingRouter;
