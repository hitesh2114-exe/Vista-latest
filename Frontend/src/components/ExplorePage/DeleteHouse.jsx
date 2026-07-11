import React, { useEffect } from "react";
import "./DeleteHouse.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeleteHouse({ id, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://vista-latest.onrender.com/listing/delete/${id}`, {
        withCredentials : true
      });
      onClose();
      navigate("/explore-page");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="delete-outer-box" role="dialog" aria-modal="true">
      <div className="delete-modal">
        <div className="delete-icon">!</div>

        <p className="delete-label">Delete listing</p>

        <h2>Are you sure?</h2>

        <p className="delete-message">
          This listing will be permanently removed from Vista. This action cannot
          be undone.
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
            onClick={handleDelete}
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
            Delete listing
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteHouse;