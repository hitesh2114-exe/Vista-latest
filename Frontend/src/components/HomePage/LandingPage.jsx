import React, { useEffect, useState } from "react";
import "./LandingPage.css";
import hero_image1 from "../../public/hero-image-1.jpg";
import hero_image2 from "../../public/hero-image-2.jpg";
import hero_image3 from "../../public/hero-image-3.jpg";
import hero_image4 from "../../public/hero-image-4.jpg";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import Logout from "./Logout";

const images = [hero_image1, hero_image2, hero_image3, hero_image4];

function LandingPage() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  //this is used for checking if the user is logged in or not
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

  return (
    <main className="hero">
      {images.map((img, i) => (
        <motion.img
          key={img}
          src={img}
          alt=""
          className="hero-slide"
          animate={{
            opacity: i === index ? 1 : 0,
            scale: i === index ? 1.04 : 1,
          }}
          transition={{
            opacity: { duration: 2.2, ease: "easeInOut" },
            scale: { duration: 8, ease: "easeOut" },
          }}
        />
      ))}

      <div className="hero-overlay"></div>

      <nav className="landing-nav">
        <button className="landing-brand" onClick={() => navigate("/")}>
          Vista
        </button>

        <div className="landing-actions">
          {user ? (
            <Button
              variant="contained"
              onClick={() => setShowConfirm(true)}
              sx={{
                backgroundColor: "#fff",
                color: "#65000B",
                textTransform: "none",
                fontWeight: "700",
                borderRadius: "999px",
                padding: "0.6rem 1.1rem",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#f3d9dc",
                  boxShadow: "none",
                },
              }}
            >
              logout
            </Button>
            
          ) : (
            <>
              <Button
                variant="text"
                onClick={() => navigate("/login")}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: "600",
                  borderRadius: "999px",
                  padding: "0.6rem 1rem",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/signup")}
                sx={{
                  backgroundColor: "#fff",
                  color: "#65000B",
                  textTransform: "none",
                  fontWeight: "700",
                  borderRadius: "999px",
                  padding: "0.6rem 1.1rem",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#f3d9dc",
                    boxShadow: "none",
                  },
                }}
              >
                Sign up
              </Button>{" "}
            </>
          )}
        </div>
      </nav>

      {showConfirm && <Logout onClose={() => setShowConfirm(false)} setUser={() => {setUser(null)}}/>}

      <section className="hero-content">
        <motion.p
          className="hero-label"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Vista stays
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.15 }}
        >
          Discover stays worth remembering.
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.35 }}
        >
          Book unique homes, peaceful retreats, and beautiful escapes made for
          your next trip.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.55 }}
        >
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
              "&:hover": {
                backgroundColor: "#4f0008",
              },
            }}
          >
            Explore stays
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/add-home")}
            sx={{
              color: "#fff",
              borderColor: "rgba(255,255,255,0.75)",
              borderRadius: "999px",
              padding: "0.85rem 1.5rem",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "700",
              "&:hover": {
                borderColor: "#fff",
                backgroundColor: "rgba(255,255,255,0.12)",
              },
            }}
          >
            Become a host
          </Button>
        </motion.div>
      </section>

      <div className="hero-bottom-bar">
        <div>
          <strong>Handpicked homes</strong>
          <span>Curated places for every kind of trip</span>
        </div>

        <div>
          <strong>Flexible stays</strong>
          <span>Find peaceful weekends or longer escapes</span>
        </div>

        <div>
          <strong>Trusted hosts</strong>
          <span>Review stays and share guest experiences</span>
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
