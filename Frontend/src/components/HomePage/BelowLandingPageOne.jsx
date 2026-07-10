import React from "react";
import "./BelowLandingPageOne.css";
import hero_image4 from "../../public/hero-image-9.jpg";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function BelowLandingPageOne() {
  const navigate = useNavigate();

  return (
    <section className="below-landingpage-one">
      <div className="below-one-inner">
        <motion.div
          className="below-one-image-card"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
        >
          <img src={hero_image4} alt="Vista stay" />

          <div className="below-one-card-content">
            <p>Featured escape</p>
            <h3>Private stays made for slower mornings.</h3>
          </div>
        </motion.div>

        <motion.div
          className="below-one-content"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p className="below-one-label">Curated destinations</p>

          <h2>Discover places you'll never forget.</h2>

          <p className="below-one-copy">
            From beachfront cottages to peaceful mountain retreats, Vista helps
            you find stays that feel personal, beautiful, and easy to book.
          </p>

          <div className="below-one-stats">
            <div>
              <strong>120+</strong>
              <span>Unique stays</span>
            </div>

            <div>
              <strong>35</strong>
              <span>Destinations</span>
            </div>

            <div>
              <strong>4.8</strong>
              <span>Guest rating</span>
            </div>
          </div>

          <Button
            variant="contained"
            onClick={() => navigate("/explore-page")}
            sx={{
              backgroundColor: "#65000B",
              borderRadius: "999px",
              padding: "0.85rem 1.5rem",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "700",
              width: "fit-content",
              "&:hover": {
                backgroundColor: "#4f0008",
              },
            }}
          >
            Explore stays
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default BelowLandingPageOne;