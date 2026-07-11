import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function MyListings() {
  const [listing, setListings] = useState([]);
  const navigate = useNavigate();

  const getListings = useCallback(async () => {
    try {
      const response = await axios.get("https://vista-latest.onrender.com/listing/user", {
        withCredentials: true,
      });
      setListings(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const loadListings = async () => {
      await getListings();
    };

    loadListings();
  }, [getListings]);

  return (
    <>
      <div className="profile-list-header">
        <div>
          <p>Published homes</p>
          <h3>My Listings</h3>
        </div>
        <span>{listing.length} total</span>
      </div>

      {listing.length === 0 ? (
        <div className="profile-empty">
          <h3>No listings yet</h3>
          <p>Your hosted homes will appear here after you add a listing.</p>
        </div>
      ) : (
        <div className="profile-card-grid">
          {listing.map((list) => (
            <article className="profile-stay-card" key={list._id}>
              <div className="profile-card-image-wrap">
                <img src={list.image.url} alt={list.title} />
                <span className="profile-status profile-status-live">Live</span>
              </div>

              <div className="profile-card-content">
                <h4>{list.title}</h4>
                <p>
                  {list.location}, {list.country}
                </p>

                <div className="profile-listing-price">
                  <span>Nightly price</span>
                  <strong>Rs. {list.price}</strong>
                </div>

                <div className="profile-card-actions">
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/house/${list._id}`)}
                  >
                    View Listing
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

export default MyListings;
