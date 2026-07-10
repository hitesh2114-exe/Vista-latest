const Reservation = require("../model/reservation");
const Listing = require("../model/listing");
const mongoose = require("mongoose");

const createReservation = async (req, res) => {
  const { listing, checkIn, checkOut, guests } = req.body;
  const user = req.user._id;
  const status = "confirmed";

  //checking if any field is empty
  if (!listing || !checkIn || !checkOut || !guests) {
    return res.status(400).json({
      message: "All required fields are mandatory.",
    });
  }

  //creating date as object
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  //validating the dates
  if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
    return res.status(400).json({
      message: "Invalid date.",
    });
  }

  //noramlize the dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  checkInDate.setHours(0, 0, 0, 0);
  checkOutDate.setHours(0, 0, 0, 0);

  //checkIn date should not be older than today
  if (checkInDate < today) {
    return res.status(400).json({
      message: "Check-in date cannot be in the past.",
    });
  }

  //checkout date must be after the checkIn date
  if (checkOutDate <= checkInDate) {
    return res.status(400).json({
      message: "Check-out date must be after check-in.",
    });
  }

  //checking for the overlapping of the dates : this checks and give if there is any overlapping dates
  const existingReservation = await Reservation.findOne({
    listing,
    status: "confirmed",
    checkIn: {
      $lt: checkOutDate, //less than
    },
    checkOut: {
      $gt: checkInDate, //greater than
    },
  });

  if (existingReservation) {
    return res.status(400).json({
      message: "Selected dates are not available.",
    });
  }

  //finding the listing
  const listingData = await Listing.findById(listing); //getting the actual listing
  if (!listingData) {
    return res.status(404).json({
      message: "Listing not found.",
    });
  }

  //prevent from booking own's property
  if (listingData.owner.equals(req.user._id)) {
    return res.status(400).json({
      message: "You cannot reserve your own property.",
    });
  }

  //calculating total price
  const milliseconds = checkOutDate - checkInDate;
  const nights = milliseconds / (1000 * 60 * 60 * 24);
  const totalPrice = nights * listingData.price; //total price

  const newReservation = new Reservation({
    listing,
    user,
    checkIn,
    checkOut,
    totalPrice,
    guests,
    status,
  });

  let response = await newReservation.save();
  res.status(200).json(response);
};

const showAllReservation = async (req, res) => {
  const allReservation = await Reservation.find({})
    .populate("listing")
    .populate("user");
  res.send(allReservation);
};

const showAllReservationOfSpecificUser = async (req, res) => {
  let userId = req.user._id;

  const reservations = await Reservation.find({ user: userId })
    .populate("listing")
    .populate("user");
  res.status(200).json(reservations);
};

const showAllReservationOfSpecificListing = async (req, res) => {
  let { listingId } = req.params;
  const reservations = await Reservation.find({ listing: listingId }).populate(
    "listing"
  );
  res.status(200).json(reservations);
};

const cancleReservation = async (req, res) => {
  let { id } = req.params;
  let response = await Reservation.findByIdAndUpdate(id, {
    status: "cancelled",
    new: true,
  });
  res.status(200).json(response);
};

const findBookedDates = async (req, res) => {
  let { listingId } = req.params;
  const bookedDates = await Reservation.find({
    listing: listingId,
    status: "confirmed",
  }).select("checkIn checkOut");
  res.send(bookedDates);
};

const showAllUserRelatedReservtion = async (req, res) => {
  let id = req.user._id;
  const listings = await Listing.find({
    owner: id,
  });

  const listingIds = listings.map((list) => list._id);

  const reservations = await Reservation.find({
    listing: { $in: listingIds },
  })
  .populate("listing")
  .populate("user");
  res.send(reservations);
};

module.exports = {
  createReservation,
  showAllReservation,
  showAllReservationOfSpecificUser,
  showAllReservationOfSpecificListing,
  cancleReservation,
  findBookedDates,
  showAllUserRelatedReservtion,
};
