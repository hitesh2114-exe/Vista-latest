import React, { useEffect } from "react";
import "../ExplorePage/DeleteHouse.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout({ onClose, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  //   const handleLogout = async () => {
  //     try {
  //       await axios.get(`http://localhost:8080/`, {
  //         withCredentials: true,
  //       });
  //       onClose();
  //       //   navigate("/explore-page");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const handleLogOut = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/logout`, {
        withCredentials: true,
      });
      console.log(response.data);
      setUser();
      onClose();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="delete-outer-box" role="dialog" aria-modal="true">
      <div className="delete-modal">
        <div className="delete-icon">!</div>

        <p className="delete-label">Logout</p>

        <h2>Are you sure?</h2>

        <p className="delete-message">You will be logged out.</p>

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
            onClick={handleLogOut}
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
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
