import React, { useEffect, useState } from "react";
import "./ForUSA.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";

function ForUSA() {
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

  const usaStays = house.filter(
    (item) => item.country?.toLowerCase() === "united states"
  );

  return (
    <section className="below-landingpage-usa">
      <div className="usa-inner">
        <div className="usa-header">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7 }}
          >
            <p className="usa-label">Featured region</p>
            <h2>
              Stay in <span>USA</span>
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

        {usaStays.length === 0 ? (
          <div className="usa-empty">
            <h3>No USA stays yet</h3>
            <p>Add a listing in the United States to feature it here.</p>
          </div>
        ) : (
          <div className="usa-slider">
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
              {usaStays.map((item) => (
                <SwiperSlide key={item._id}>
                  <article
                    className="usa-card"
                    onClick={() => navigate(`/house/${item._id}`, { state: item })}
                  >
                    <div className="usa-image-wrap">
                      <img src={item?.image?.url} alt={item.title} />
                      <span>USA stay</span>
                    </div>

                    <div className="usa-card-content">
                      <h3>{item.title}</h3>
                      <p>{item.location}, {item.country}</p>

                      <div className="usa-card-bottom">
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
      </div>
    </section>
  );
}

export default ForUSA;