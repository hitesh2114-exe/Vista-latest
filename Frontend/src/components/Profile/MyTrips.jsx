import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CancelReservation from "./CancelReservation";

function MyTrips() {
  const navigate = useNavigate();
  const [tripDetails, setTripDetails] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/reservation/my-trips", {
        withCredentials: true,
      });

      setTripDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const loadTrips = async () => {
      await fetchData();
    };

    loadTrips();
  }, [fetchData]);

  return (
    <>
      <div className="profile-list-header">
        <div>
          <p>Travel plans</p>
          <h3>My Trips</h3>
        </div>
        <span>{tripDetails.length} total</span>
      </div>

      {tripDetails.length === 0 ? (
        <div className="profile-empty">
          <h3>No trips yet</h3>
          <p>Your booked stays will appear here when you reserve a Vista home.</p>
        </div>
      ) : (
        <div className="profile-card-grid">
          {tripDetails.map((trip) => (
            <article className="profile-stay-card" key={trip._id}>
              <div className="profile-card-image-wrap">
                <img src={trip.listing.image.url} alt={trip.listing.title} />
                <span className={`profile-status profile-status-${trip.status}`}>
                  {trip.status}
                </span>
              </div>

              <div className="profile-card-content">
                <h4>{trip.listing.title}</h4>
                <p>
                  {trip.listing.location}, {trip.listing.country}
                </p>

                <div className="profile-meta-grid">
                  <div>
                    <span>Check in</span>
                    <strong>{dayjs(trip.checkIn).format("DD MMM YYYY")}</strong>
                  </div>
                  <div>
                    <span>Check out</span>
                    <strong>{dayjs(trip.checkOut).format("DD MMM YYYY")}</strong>
                  </div>
                  <div>
                    <span>Guests</span>
                    <strong>{trip.guests}</strong>
                  </div>
                  <div>
                    <span>Total</span>
                    <strong>Rs. {trip.totalPrice}</strong>
                  </div>
                </div>

                <div className="profile-card-actions">
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/house/${trip.listing._id}`)}
                  >
                    View Listing
                  </Button>
                  {trip.status === "confirmed" && (
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        setShowConfirm(true);
                        setSelectedReservationId(trip._id);
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {showConfirm && (
        <CancelReservation
          onClose={() => setShowConfirm(false)}
          id={selectedReservationId}
          fetchData={() => fetchData()}
        />
      )}
    </>
  );
}

export default MyTrips;
