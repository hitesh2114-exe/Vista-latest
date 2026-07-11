import { useState } from "react";
import "./AddHome.css";
import Navbar from "../Commons/Navbar";
import Bottom from "../Commons/Bottom";
import image from "../../public/hero-image-4.jpg";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AddHome() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    country: "",
    price: "",
    image: {
      url: "",
      public_id: "",
    },
  });

  const [uploading, setUploading] = useState(false);
  const [loginMsg, setLoginMsg] = useState(false);
  const [imageName, setImageName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadImage = async (file) => {
    try {
      setUploading(true);

      const data = new FormData();

      data.append("file", file);
      data.append("upload_preset", "vista_upload");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dszapvyjv/image/upload",
        data
      );

      return {
        url: response.data.secure_url,
        filename: response.data.public_id,
      };
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImageName(file.name);

    try {
      const uploadedImage = await uploadImage(file);

      setFormData((prev) => ({
        ...prev,
        image: uploadedImage,
      }));
    } catch (err) {
      console.log(err);
      setImageName("");
      alert("Image upload failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.image.url) {
        alert("Please upload an image first.");
        return;
      }

      const response = await axios.post(
        "https://vista-latest.onrender.com/listing/create",
        formData,
        {
          withCredentials: true,
        }
      );

      setLoginMsg(false);
      console.log(response.data);
      navigate("/explore-page");
    } catch (error) {
      if (error.response?.status === 401) {
        setLoginMsg(true);
      }

      console.log(error);
    }
  };

  useEffect(() => {
    console.log(loginMsg);
  }, [loginMsg]);

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
      {loginMsg && (
        <Alert
          severity="error"
          sx={{ position: "absolute", top: "5rem", left: "39%", zIndex: "1" }}
        >
          You need to login first! Click here to{" "}
          <Link
            to={`/login`}
            style={{ textDecoration: "none" }}
            onClick={() => {
              if (location.pathname !== "/login") {
                localStorage.setItem(
                  "postLoginRedirect",
                  location.pathname + location.search
                );
              }
            }}
          >
            Login
          </Link>
        </Alert>
      )}

      <main className="add-home-outer-box">
        <section className="add-home-page">
          <div className="add-home-visual">
            <img src={image} />

            <div className="add-home-visual-content">
              <p>Vista hosting</p>
              <h1>Add your home</h1>
              <span>
                Share your place with guests looking for memorable stays.
              </span>
            </div>
          </div>

          <div className="add-home-card">
            <div className="add-home-header">
              <p className="add-home-label">Create listing</p>
              <h2>Tell guests about your place</h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="add-home-form"
              encType="multipart/form-data"
            >
              <TextField
                name="title"
                label="Listing title"
                variant="outlined"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
                sx={inputStyle}
              />

              <TextField
                name="description"
                label="Description"
                value={formData.description}
                multiline
                rows={5}
                onChange={handleChange}
                fullWidth
                required
                sx={inputStyle}
              />

              <div className="add-home-two-fields">
                <TextField
                  name="location"
                  label="Location"
                  variant="outlined"
                  value={formData.location}
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={inputStyle}
                />

                <TextField
                  name="country"
                  label="Country"
                  value={formData.country}
                  variant="outlined"
                  onChange={handleChange}
                  fullWidth
                  required
                  sx={inputStyle}
                />
              </div>

              <div className="add-home-two-fields">
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

                <div className="add-home-upload-field">
                  <input
                    className="add-home-file-input"
                    id="image"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={uploading}
                  />

                  <label
                    className={`add-home-upload-box ${
                      uploading ? "is-uploading" : ""
                    }`}
                    htmlFor="image"
                  >
                    <span className="add-home-upload-icon">
                      <CloudUploadOutlinedIcon fontSize="small" />
                    </span>

                    <span className="add-home-upload-copy">
                      <strong>
                        {uploading
                          ? "Uploading image..."
                          : imageName || "Upload listing photo"}
                      </strong>
                      <small>
                        {formData.image.url
                          ? "Image ready. Choose another to replace it."
                          : "JPG, PNG, or WEBP"}
                      </small>
                    </span>
                  </label>
                </div>
              </div>

              {uploading && <p>Uploading image...It may take upto a minute.</p>}

              {formData.image.url && (
                <div
                  /*style={{ marginTop: "15px" }}*/ className="add-home-preview"
                >
                  <img
                    src={formData.image.url}
                    alt="Preview"
                    // style={{
                    //   width: "250px",
                    //   borderRadius: "10px",
                    // }}
                  />
                </div>
              )}
              
              <div className="add-home-footer">
                <p>You can edit listing details after publishing.</p>

                <Button
                  variant="contained"
                  type="submit"
                  disabled={uploading}
                  sx={{
                    backgroundColor: "#65000B",
                    borderRadius: "0.8rem",
                    padding: "0.85rem 1.5rem",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: "600",
                    "&:hover": {
                      backgroundColor: "#4f0008",
                    },
                  }}
                >
                  {uploading ? "Uploading Image..." : "Add Home"}
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

export default AddHome;
