const express = require("express");
const reservationRoute = express.Router();
const reservation = require("../controllers/reservationController");
const { isLoggedIn } = require("../middleware");

reservationRoute.post(
  "/reservation/create",
  isLoggedIn,
  reservation.createReservation
);
reservationRoute.get("/reservation/all", reservation.showAllReservation);
reservationRoute.get(
  "/reservation/my-trips",
  isLoggedIn,
  reservation.showAllReservationOfSpecificUser
);
reservationRoute.get(
  "/reservation/user",
  isLoggedIn,
  reservation.showAllUserRelatedReservtion
);
reservationRoute.get(
  "/reservation/host/:listingId",
  reservation.showAllReservationOfSpecificListing
);
reservationRoute.patch(
  "/reservation/:id/cancel",
  reservation.cancleReservation
);
reservationRoute.get("/reservation/:listingId", reservation.findBookedDates);
module.exports = reservationRoute;
