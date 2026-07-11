import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import CancelReservation from "./CancelReservation";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Reservations() {
  const [reservation, setReservation] = useState([]);
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  const getReservations = useCallback(async () => {
    try {
      const response = await axios.get("https://vista-latest.onrender.com/reservation/user", {
        withCredentials: true,
      });
      setReservation(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const loadReservations = async () => {
      await getReservations();
    };

    loadReservations();
  }, [getReservations]);

  return (
    <>
      <div className="profile-list-header">
        <div>
          <p>Guest bookings</p>
          <h3>Reservations</h3>
        </div>
        <span>{reservation.length} total</span>
      </div>

      {reservation.length === 0 ? (
        <div className="profile-empty">
          <h3>No reservations yet</h3>
          <p>Bookings for your listings will appear here when guests reserve.</p>
        </div>
      ) : (
        <div className="profile-card-grid">
          {reservation.map((reserve) => (
            <article className="profile-stay-card" key={reserve._id}>
              <div className="profile-card-image-wrap">
                <img src={reserve.listing.image.url} alt={reserve.listing.title} />
                <span className={`profile-status profile-status-${reserve.status}`}>
                  {reserve.status}
                </span>
              </div>

              <div className="profile-card-content">
                <h4>{reserve.listing.title}</h4>
                <p>
                  {reserve.listing.location}, {reserve.listing.country}
                </p>

                <div className="profile-meta-grid">
                  <div>
                    <span>Check in</span>
                    <strong>{dayjs(reserve.checkIn).format("DD MMM YYYY")}</strong>
                  </div>
                  <div>
                    <span>Check out</span>
                    <strong>{dayjs(reserve.checkOut).format("DD MMM YYYY")}</strong>
                  </div>
                  <div>
                    <span>Guests</span>
                    <strong>{reserve.guests}</strong>
                  </div>
                  <div>
                    <span>Total</span>
                    <strong>Rs. {reserve.totalPrice}</strong>
                  </div>
                </div>

                <div className="profile-contact-box">
                  <span>Booked by</span>
                  <strong>{reserve.user.username}</strong>
                  <p>{reserve.user.email}</p>
                </div>

                <div className="profile-card-actions">
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/house/${reserve.listing._id}`)}
                  >
                    View Listing
                  </Button>
                  {reserve.status === "confirmed" && (
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => {
                        setShowConfirm(true);
                        setSelectedReservationId(reserve._id);
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
          fetchData={() => getReservations()}
        />
      )}
    </>
  );
}

export default Reservations;
