import React, { useState } from "react";
import "./AddReview.css";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function AddReview({ refreshListing }) {
  const { id } = useParams();
  const location = useLocation();

  const [formData, setFormData] = useState({
    comment: "",
    rating: 4,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`https://vista-latest.onrender.com/listing/${id}/review`, formData, {
        withCredentials: true,
      });
      refreshListing();

      setFormData({
        comment: "",
        rating: 4,
      });
      setIsLoggedIn(false);
    } catch (error) {
      if (error.response?.status === 401) {
        setIsLoggedIn(true);
      }
      // console.log(error);
    }
  };

  return (
    <section className="add-review-box">
      {isLoggedIn && (
        <Alert
          severity="error"
          sx={{ position: "absolute", marginTop: "2rem" }}
        >
          You need to login first! Click here to{" "}
          <Link
            to={`/login`}
            style={{ textDecoration: "none" }}
            onClick={() => {
              if (location.pathname !== "/login") {
                localStorage.setItem(
                  "postLoginRedirect",
                  location.pathname + location.search
                );
              }
            }}
          >
            Login
          </Link>
        </Alert>
      )}
      <div className="add-review-card">
        <div className="add-review-header">
          <div>
            <p className="add-review-label">Guest experience</p>
            <h2>Leave a review</h2>
          </div>

          <div className="add-review-score">
            <strong>{formData.rating}.0</strong>
            <span>out of 5</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="add-review-form">
          <TextField
            name="comment"
            value={formData.comment}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                comment: e.target.value,
              }))
            }
            label="Your review"
            multiline
            rows={5}
            placeholder="Share what stood out about your stay..."
            fullWidth
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.9rem",
                backgroundColor: "#fff",
              },
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "#65000B",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#65000B",
              },
            }}
          />

          <div className="add-review-rating-row">
            <div>
              <h3>Rating</h3>
              <p>Move the slider to rate your stay.</p>
            </div>

            <div className="add-review-slider">
              <Slider
                aria-label="Rating"
                value={formData.rating}
                valueLabelDisplay="auto"
                onChange={(event, newValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    rating: newValue,
                  }))
                }
                step={1}
                marks={[
                  { value: 1, label: "1" },
                  { value: 2, label: "2" },
                  { value: 3, label: "3" },
                  { value: 4, label: "4" },
                  { value: 5, label: "5" },
                ]}
                min={1}
                max={5}
                sx={{
                  color: "#65000B",
                  "& .MuiSlider-markLabel": {
                    fontSize: "0.8rem",
                    color: "#666",
                  },
                }}
              />
            </div>
          </div>

          <div className="add-review-footer">
            <p>Your review helps future guests book with confidence.</p>

            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#65000B",
                borderRadius: "0.8rem",
                padding: "0.8rem 1.4rem",
                textTransform: "none",
                fontSize: "0.98rem",
                "&:hover": {
                  backgroundColor: "#4f0008",
                },
              }}
            >
              Add Review
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddReview;
