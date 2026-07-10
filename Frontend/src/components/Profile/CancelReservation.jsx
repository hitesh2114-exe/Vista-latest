import React from "react";
import "../ExplorePage/DeleteHouse.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CancelReservation({ id, onClose, fetchData }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleCancelReservation = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/reservation/${id}/cancel`
      );
      fetchData();
      onClose();
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="delete-outer-box" role="dialog" aria-modal="true">
      <div className="delete-modal">
        <div className="delete-icon">!</div>

        <p className="delete-label">Cancel Reservation</p>

        <h2>Are you sure?</h2>

        <p className="delete-message">
          Do you want to cancel this reservation. This reservation will be
          permanently cancelled.
        </p>

        <div className="delete-actions">
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: "#d8d8d8",
              color: "#222",
              borderRadius: "0.75rem",
              padding: "0.75rem 1rem",
              textTransform: "none",
              fontWeight: "600",
              "&:hover": {
                borderColor: "#bdbdbd",
                backgroundColor: "#f7f7f7",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleCancelReservation}
            sx={{
              backgroundColor: "#65000B",
              borderRadius: "0.75rem",
              padding: "0.75rem 1rem",
              textTransform: "none",
              fontWeight: "600",
              "&:hover": {
                backgroundColor: "#4f0008",
              },
            }}
          >
            Cancel Reservation
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CancelReservation;
