import React, { useEffect, useState } from "react";
import "./Explorepage.css";
import Navbar from "../Commons/Navbar";
import Bottom from "../Commons/Bottom.jsx";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Explorepage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [house, setHouse] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/listing/all")
      .then((response) => {
        setHouse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredData = house.filter(
    (item) =>
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase()) ||
      item.country?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <main className="explore-main-page">
        <section className="explore-hero">
          <div>
            <p className="explore-label">Vista stays</p>
            <h1>Explore your next stay</h1>
            <p className="explore-subtitle">
              Discover handpicked homes, city apartments, beach villas, and
              quiet retreats for your next trip.
            </p>
          </div>

          <div className="explore-search-card">
            <TextField
              label="Search by name or location"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
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

            <span>
              {filteredData.length} {filteredData.length === 1 ? "stay" : "stays"} found
            </span>
          </div>
        </section>

        {filteredData.length === 0 ? (
          <section className="explore-empty">
            <h2>No stays found</h2>
            <p>Try searching for another city, country, or listing name.</p>
          </section>
        ) : (
          <section className="explore-grid">
            {filteredData.map((item) => (
              <article
                className="explore-card"
                key={item._id}
                onClick={() => navigate(`/house/${item._id}`, { state: item })}
              >
                <div className="explore-card-image-wrap">
                  <img
                    src={item?.image?.url}
                    alt={item.title}
                    className="explore-card-image"
                  />

                  <div className="explore-card-badge">Available</div>
                </div>

                <div className="explore-card-content">
                  <div>
                    <h2>{item.title}</h2>
                    <p>
                      {item.location}, {item.country}
                    </p>
                  </div>

                  <div className="explore-card-bottom">
                    <div>
                      <strong>₹{item.price}</strong>
                      <span>/ night</span>
                    </div>

                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#65000B",
                        color: "#65000B",
                        borderRadius: "999px",
                        textTransform: "none",
                        fontWeight: "600",
                        "&:hover": {
                          borderColor: "#65000B",
                          backgroundColor: "#fff3f4",
                        },
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      <Bottom />
    </>
  );
}

export default Explorepage;