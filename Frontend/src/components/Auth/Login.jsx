import React from "react";
import "./Login.css";
import Box from "@mui/material/Box";
import image from "../../public/hero-image-3.jpg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const redirectPath = localStorage.getItem("postLoginRedirect") || "/";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      setError("");
      console.log(response.data);

      if (response.data.success) {
        localStorage.removeItem("postLoginRedirect");
        navigate(redirectPath);
      }
    } catch (error) {
      // console.error(error);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-box">
      <img src={image} className="login-image" alt="" />

      <div className="login-home-link">
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
          <h1 className="login-title">Login</h1>

          <Box
            sx={{
              width: "100%",
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <form onSubmit={handleLogin}>
              <TextField
                name="username"
                label="username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
                sx={{ marginBottom: "1rem", width: "100%" }}
              />

              <TextField
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                sx={{ marginBottom: "1rem", width: "100%" }}
                onChange={handleChange}
              />
              {error && (
                <p style={{ fontsize: "0.8rem", color: "grey" }}>
                  {error}, Try again.
                </p>
              )}

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
                login
              </Button>
            </form>
            <h5 className="login-signup-text">
              new user?
              <Link to="/signup"> Sign Up </Link>
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
          <img src={image} className="login-image-inside-box" alt="" />
        </Box>
      </Box>
    </div>
  );
}

export default Login;
