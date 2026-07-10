import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Edit.css";
import Navbar from "../Commons/Navbar";
import Bottom from "../Commons/Bottom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [home, setHome] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    country: "",
    price: "",
    _id: "",
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/listing/${id}`);
        setHome(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchListing();
  }, [id]);

  useEffect(() => {
    if (home?._id) {
      setFormData({
        title: home.title || "",
        description: home.description || "",
        location: home.location || "",
        country: home.country || "",
        price: home.price || "",
        _id: home._id || "",
      });
    }
  }, [home]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put("http://localhost:8080/listing/update", formData, {
        withCredentials: true,
      });
      navigate(`/house/${home._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const inputStyle = {
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
  };

  return (
    <>
      <Navbar />

      <main className="edit-outer-box">
        <section className="edit-page">
          <div className="edit-preview">
            <img src={home?.image?.url} alt={home.title || "Listing"} />

            <div className="edit-preview-content">
              <p>Update listing</p>
              <h1>{home.title || "Edit your stay"}</h1>
              <span>
                Refresh the details guests see before booking this Vista stay.
              </span>
            </div>
          </div>

          <div className="edit-card">
            <div className="edit-header">
              <p className="edit-label">Listing details</p>
              <h2>Edit your home</h2>
            </div>

            <form onSubmit={handleSubmit} className="edit-form">
              <TextField
                name="title"
                value={formData.title}
                onChange={handleChange}
                label="Listing title"
                variant="outlined"
                fullWidth
                required
                sx={inputStyle}
              />

              <TextField
                name="description"
                label="Description"
                multiline
                rows={5}
                value={formData.description}
                onChange={handleChange}
                fullWidth
                required
                sx={inputStyle}
              />

              <div className="edit-two-fields">
                <TextField
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  label="Location"
                  variant="outlined"
                  fullWidth
                  required
                  sx={inputStyle}
                />

                <TextField
                  name="country"
                  label="Country"
                  variant="outlined"
                  value={formData.country}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={inputStyle}
                />
              </div>

              <TextField
                name="price"
                label="Price per night"
                type="number"
                variant="outlined"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                required
                sx={inputStyle}
              />

              <div className="edit-footer">
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/house/${home._id || id}`)}
                  sx={{
                    color: "#222",
                    borderColor: "#d8d8d8",
                    borderRadius: "0.8rem",
                    padding: "0.8rem 1.4rem",
                    textTransform: "none",
                    fontWeight: "600",
                    "&:hover": {
                      borderColor: "#bdbdbd",
                      backgroundColor: "#f7f7f7",
                    },
                  }}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: "#65000B",
                    borderRadius: "0.8rem",
                    padding: "0.8rem 1.5rem",
                    textTransform: "none",
                    fontWeight: "600",
                    "&:hover": {
                      backgroundColor: "#4f0008",
                    },
                  }}
                >
                  Save changes
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Bottom />
    </>
  );
}

export default Edit;
