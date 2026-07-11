import React, { useEffect, useState } from "react";
import "./BelowLandingPageFour.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";

function BelowLandingPageFour() {
  const navigate = useNavigate();
  const [house, setHouse] = useState([]);

  useEffect(() => {
    axios
      .get("https://vista-latest.onrender.com/listing/all")
      .then((response) => {
        setHouse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section className="below-landingpage-four">
      <div className="below-four-inner">
        <div className="below-four-header">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7 }}
          >
            <p className="below-four-label">Popular stays</p>
            <h2>
              Discover <span>unique stays</span>
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
            Explore all stays
            <ArrowForwardIcon sx={{ marginLeft: "0.45rem", fontSize: "1.1rem" }} />
          </Button>
        </div>

        <div className="below-four-slider">
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
            {house.map((item) => (
              <SwiperSlide key={item._id}>
                <article
                  className="below-four-card"
                  onClick={() => navigate(`/house/${item._id}`, { state: item })}
                >
                  <div className="below-four-image-wrap">
                    <img src={item?.image?.url} alt={item.title} />
                    <span>Featured</span>
                  </div>

                  <div className="below-four-card-content">
                    <h3>{item.title}</h3>
                    <p>
                      {item.location}, {item.country}
                    </p>

                    <div className="below-four-card-bottom">
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
      </div>
    </section>
  );
}

export default BelowLandingPageFour;