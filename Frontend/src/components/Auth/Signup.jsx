import React from "react";
import "./Signup.css";
import Box from "@mui/material/Box";
import image from "../../public/hero-image-3.jpg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://vista-latest.onrender.com/signup`,
        formData,
        {
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="signup-box">
      <img src={image} className="signup-image" alt="" />

      <div className="signup-home-link">
        <h5>
          back to <Link to="/">Home page</Link>
        </h5>
      </div>

      <Box
        sx={{
          width: { xs: "90%", sm: "80%", md: "60%" },
          minHeight: { xs: "auto", md: "65%" },
          backgroundColor: "aliceblue",
          position: "relative",
          borderRadius: "1rem",
          boxShadow: "0 4px 20px rgba(26, 12, 12, 0.6)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            background: "#E5E4E2",
            padding: { xs: "2rem 1.3rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          <h1 className="signup-title">Sign up</h1>

          <Box
            sx={{
              width: "100%",
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <form onSubmit={handleSignup}>
              <TextField
                name="username"
                label="username"
                variant="outlined"
                sx={{ marginBottom: "1rem", width: "100%" }}
                value={formData.username}
                onChange={handleChange}
              />

              <TextField
                name="email"
                label="email"
                variant="outlined"
                sx={{ marginBottom: "1rem", width: "100%" }}
                value={formData.email}
                onChange={handleChange}
              />

              <TextField
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                sx={{ marginBottom: "1rem", width: "100%" }}
                value={formData.password}
                onChange={handleChange}
              />

              <Button
                variant="outlined"
                type="submit"
                sx={{
                  width: { xs: "100%", sm: "60%" },
                  height: "2.5rem",
                  marginTop: "1rem",
                  color: "#65000B",
                  borderColor: "#65000B",
                }}
              >
                sign up
              </Button>
            </form>
            <h5 className="signup-login-text">
              Already a user?
              <Link to="/login"> Login </Link>
              here
            </h5>
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            height: { xs: "14rem", md: "auto" },
            display: { xs: "none", sm: "block" },
          }}
        >
          <img src={image} className="signup-image-inside-box" alt="" />
        </Box>
      </Box>
    </div>
  );
}

export default Signup;
