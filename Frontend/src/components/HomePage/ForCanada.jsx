import React, { useEffect, useState } from "react";
import "./ForCanada.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";

function ForCanada() {
  const navigate = useNavigate();
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

  const canadaStays = house.filter(
    (item) => item.country?.toLowerCase() === "canada"
  );

  return (
    <section className="below-landingpage-canada">
      <div className="canada-inner">
        <div className="canada-header">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7 }}
          >
            <p className="canada-label">Northern escapes</p>
            <h2>
              Stay in <span>Canada</span>
            </h2>
          </motion.div>

          <Button
            variant="outlined"
            onClick={() => navigate("/explore-page")}
            sx={{
              borderRadius: "999px",
              padding: "0.7rem 1.2rem",
              color: "#65000B",
              borderColor: "#65000B",
              textTransform: "none",
              fontWeight: "700",
              "&:hover": {
                borderColor: "#65000B",
                backgroundColor: "#fff3f4",
              },
            }}
          >
            Explore stays
            <ArrowForwardIcon sx={{ marginLeft: "0.45rem", fontSize: "1.1rem" }} />
          </Button>
        </div>

        {canadaStays.length === 0 ? (
          <div className="canada-empty">
            <h3>No Canada stays yet</h3>
            <p>Add a listing in Canada to feature it here.</p>
          </div>
        ) : (
          <div className="canada-slider">
            <Swiper
              modules={[Navigation]}
              navigation
              grabCursor
              spaceBetween={20}
              breakpoints={{
                0: { slidesPerView: 1 },
                650: { slidesPerView: 2 },
                950: { slidesPerView: 3 },
                1250: { slidesPerView: 4 },
              }}
            >
              {canadaStays.map((item) => (
                <SwiperSlide key={item._id}>
                  <article
                    className="canada-card"
                    onClick={() => navigate(`/house/${item._id}`, { state: item })}
                  >
                    <div className="canada-image-wrap">
                      <img src={item?.image?.url} alt={item.title} />
                      <span>Canada stay</span>
                    </div>

                    <div className="canada-card-content">
                      <h3>{item.title}</h3>
                      <p>
                        {item.location}, {item.country}
                      </p>

                      <div className="canada-card-bottom">
                        <div>
                          <strong>₹{item.price}</strong>
                          <span>/ night</span>
                        </div>

                        <button type="button">View</button>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <div className="canada-footer-action">
          <Button
            variant="text"
            onClick={() => navigate("/explore-page")}
            sx={{
              color: "#65000B",
              borderRadius: "999px",
              padding: "0.8rem 1.2rem",
              textTransform: "none",
              fontWeight: "700",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#fff3f4",
              },
            }}
          >
            Discover your next stay
            <ArrowForwardIcon sx={{ marginLeft: "0.45rem", fontSize: "1.1rem" }} />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ForCanada;