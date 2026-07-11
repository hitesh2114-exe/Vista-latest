import React from "react";
import "./BelowLandingPageTwo.css";
import Box from "@mui/material/Box";
import { duration, Typography } from "@mui/material";
import { motion } from "framer-motion";

function BelowLandingPageTwo() {
  const MotionTypography = motion(Typography);

  return (
    <>
      <div className="below-landingpage-two">
        <Box
          sx={{
            // background: "blue",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MotionTypography
            sx={{ fontSize: "5rem", display: "block" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            Find your{" "}
            <MotionTypography
              sx={{
                fontSize: "5rem",
                display: "inline-block",
                color: "#65000B",
              }}
              component="span"
            >
              perfect stay
            </MotionTypography>
            .
          </MotionTypography>
          <MotionTypography
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8,  delay: 0.4 }}
          >
            Discover unique homes, stunning destinations, and unforgettable
            experiences around the world.
          </MotionTypography>
        </Box>
      </div>
    </>
  );
}

export default BelowLandingPageTwo;
