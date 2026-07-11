import React from "react";
import "./ShowReview.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function ShowReview({ reviews = [], id, refreshListing }) {
  const [user, setUser] = useState({});
  const [listingOwner, setListingOwner] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("https://vista-latest.onrender.com/me", {
          withCredentials: true,
        });

        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const getListing = async () => {
      try {
        const response = await axios.get(
          `https://vista-latest.onrender.com/listing/${id}`,
          {
            withCredentials: true,
          }
        );
        // console.log(response.data.owner._id);
        setListingOwner(response.data.owner._id);
      } catch (error) {
        setListingOwner(null);
      }
    };

    getListing();
  }, [id]);

  // useEffect(() => {
  //   console.log(listingOwner);
  // });

  // useEffect(() => {
  //   console.log(user._id);
  // });

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(
        `https://vista-latest.onrender.com/listing/${id}/reviews/${reviewId}`,
        {
          withCredentials: true,
        }
      );
      refreshListing();
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   console.log(reviews);
  // }, []);

  return (
    <section className="review-outer-box">
      <div className="review-panel">
        <div className="review-header">
          <div>
            <p className="review-label">Guest reviews</p>
            <h2>What guests are saying</h2>
          </div>

          <div className="review-count">
            <strong>{reviews.length}</strong>
            <span>{reviews.length === 1 ? "review" : "reviews"}</span>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="review-empty">
            <h3>No reviews yet</h3>
            <p>Be the first guest to share your experience about this stay.</p>
          </div>
        ) : (
          <div className="review-grid">
            {reviews.map((rew) => (
              <article className="review-card" key={rew._id}>
                <div className="review-card-top">
                  <div className="review-user">
                    <div className="review-avatar">
                      {rew?.author?.username?.charAt(0)?.toUpperCase() || "G"}
                    </div>

                    <div>
                      <strong>{rew?.author?.username || "Guest"}</strong>
                      <span>Verified stay</span>
                    </div>
                  </div>

                  <div className="review-rating">
                    <strong>{rew.rating}.0</strong>
                    <span>/ 5</span>
                  </div>
                </div>

                <p className="review-comment">{rew.comment}</p>

                <div className="review-card-bottom">
                  <span>Stayed recently</span>

                  {/* <Button
                    variant="text"
                    color="error"
                    onClick={() => handleDelete(rew._id)}
                    sx={{
                      textTransform: "none",
                      fontWeight: "600",
                    }}
                  >
                    Delete
                  </Button> */}

                  {(user?._id === rew?.author?._id ||
                    user?._id === listingOwner) && (
                    <Button
                      variant="text"
                      color="error"
                      onClick={() => handleDelete(rew._id)}
                      sx={{
                        textTransform: "none",
                        fontWeight: "600",
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ShowReview;
