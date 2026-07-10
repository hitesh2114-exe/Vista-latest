import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./House.css";
import Navbar from "../Commons/Navbar";
import Bottom from "../Commons/Bottom";
import Button from "@mui/material/Button";
import axios from "axios";
import DeleteHouse from "./DeleteHouse";
import AddReview from "../Review/AddReview";
import ShowReview from "../Review/ShowReview";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import Alert from "@mui/material/Alert";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

function House() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [home, setHome] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [bookedDates, setBookedDates] = useState([]);

  const [formData, setFormData] = useState({
    checkIn: null,
    checkOut: null,
    guests: 1,
  });

  const fetchListing = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/listing/${id}`);
      setHome(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const reservedDates = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8080/reservation/${id}`);
      setBookedDates(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:8080/me", {
          withCredentials: true,
        });

        setUser(response.data.user);
      } catch {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const loadPage = async () => {
      await Promise.all([fetchListing(), reservedDates()]);
    };

    loadPage();
  }, [fetchListing, reservedDates]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/listing/delete/${home._id}`, {
        withCredentials: true,
      });
      navigate("/explore-page");
    } catch (error) {
      console.error(error);
    }
  };

  const handleReservation = (field, value) => {
    setError("");
    setSuccess("");
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const totalDays = useMemo(() => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    return Math.max(formData.checkOut.diff(formData.checkIn, "day"), 0);
  }, [formData.checkIn, formData.checkOut]);

  const totalPrice = useMemo(() => {
    return totalDays * (home.price || 0) * Number(formData.guests || 1);
  }, [totalDays, home.price, formData.guests]);

  const isReservationReady =
    formData.checkIn &&
    formData.checkOut &&
    totalDays > 0 &&
    Number(formData.guests) > 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    if (!isReservationReady) {
      setError("Please choose valid dates and at least one guest.");
      setSuccess("");
      return;
    }

    const reservationData = {
      checkIn: formData.checkIn?.toISOString(),
      checkOut: formData.checkOut?.toISOString(),
      guests: Number(formData.guests),
      listing: id,
    };

    try {
      await axios.post("http://localhost:8080/reservation/create", reservationData, {
        withCredentials: true,
      });

      setError("");
      setSuccess("Reservation created successfully!");
      await reservedDates();
      setFormData({
        checkIn: null,
        checkOut: null,
        guests: 1,
      });
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setSuccess("");
    }
  };

  const shouldDisableDate = (date) => {
    return bookedDates.some((reservation) => {
      const checkIn = dayjs(reservation.checkIn);
      const checkOut = dayjs(reservation.checkOut);

      return (
        (date.isSame(checkIn, "day") || date.isAfter(checkIn, "day")) &&
        date.isBefore(checkOut, "day")
      );
    });
  };

  return (
    <>
      <Navbar />

      <div className="house-outer-box">
        <div className="house-page">
          <button className="house-back-btn" onClick={() => navigate(-1)}>
            <ArrowBackIcon fontSize="small" />
            Back
          </button>

          <section className="house-hero">
            <div className="house-hero-content">
              <p className="house-label">Premium stay</p>
              <h1>{home.title || "Vista stay"}</h1>
              <p className="house-location">
                <LocationOnOutlinedIcon fontSize="small" />
                {home.location}, {home.country}
              </p>

              <div className="house-highlights">
                <span>
                  <HomeOutlinedIcon fontSize="small" />
                  Entire home
                </span>
                <span>
                  <VerifiedOutlinedIcon fontSize="small" />
                  Verified host
                </span>
                <span>
                  <CalendarMonthOutlinedIcon fontSize="small" />
                  Flexible stays
                </span>
              </div>
            </div>

            <div className="house-image-wrap">
              <img
                src={home?.image?.url}
                alt={home.title || "Vista listing"}
                className="house-image"
              />
            </div>
          </section>

          <section className="house-details-grid">
            <div className="house-main">
              <div className="house-section">
                <h2>About this place</h2>
                <p>{home.description}</p>
              </div>

              <div className="house-section">
                <h2>What this place offers</h2>

                <div className="house-amenities">
                  <div>
                    <HomeOutlinedIcon />
                    <strong>Comfort</strong>
                    <span>Air conditioning, cozy interiors</span>
                  </div>
                  <div>
                    <WifiOutlinedIcon />
                    <strong>Connectivity</strong>
                    <span>High-speed Wi-Fi available</span>
                  </div>
                  <div>
                    <LocationOnOutlinedIcon />
                    <strong>Location</strong>
                    <span>Close to local attractions</span>
                  </div>
                  <div>
                    <VerifiedOutlinedIcon />
                    <strong>Booking</strong>
                    <span>Instant confirmation available</span>
                  </div>
                </div>
              </div>

              <div className="house-section house-calendar-section">
                <div>
                  <h2>Availability</h2>
                  <p>Booked dates are disabled so you can quickly spot open stays.</p>
                </div>

                <div className="house-calendar-card">
                  <DateCalendar
                    readOnly
                    shouldDisableDate={shouldDisableDate}
                    minDate={dayjs()}
                  />
                </div>
              </div>

              <div className="house-section">
                <h2>Hosted by</h2>
                <div className="house-host">
                  <div className="house-host-avatar">
                    {home?.owner?.username?.charAt(0)?.toUpperCase() || "H"}
                  </div>
                  <div>
                    <strong>{home?.owner?.username || "Vista Host"}</strong>
                    <span>Verified host</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleReservationSubmit}>
              <aside className="house-booking-card">
                <div className="house-price-row">
                  <div>
                    <span className="house-booking-label">Reserve your stay</span>
                    <h3>Rs. {home.price || 0}</h3>
                  </div>
                  <span>/ night</span>
                </div>

                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}

                <div className="house-booking-box">
                  <div className="house-field">
                    <DatePicker
                      name="checkIn"
                      label="Check in"
                      value={formData.checkIn}
                      onChange={(newValue) => handleReservation("checkIn", newValue)}
                      shouldDisableDate={shouldDisableDate}
                      minDate={dayjs()}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </div>

                  <div className="house-field">
                    <DatePicker
                      name="checkOut"
                      label="Check out"
                      value={formData.checkOut}
                      onChange={(newValue) => handleReservation("checkOut", newValue)}
                      minDate={
                        formData.checkIn ? formData.checkIn.add(1, "day") : dayjs()
                      }
                      shouldDisableDate={shouldDisableDate}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </div>

                  <div className="house-field">
                    <TextField
                      label="Guests"
                      variant="outlined"
                      name="guests"
                      type="number"
                      value={formData.guests}
                      onChange={handleInputChange}
                      fullWidth
                      inputProps={{ min: 1 }}
                    />
                  </div>

                  <div className="house-price-breakdown">
                    <div>
                      <CalendarMonthOutlinedIcon fontSize="small" />
                      <span>
                        {totalDays
                          ? `${totalDays} night${totalDays !== 1 ? "s" : ""}`
                          : "Select dates"}
                      </span>
                    </div>
                    <div>
                      <PeopleAltOutlinedIcon fontSize="small" />
                      <span>
                        {formData.guests} guest
                        {Number(formData.guests) !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <p>
                      Rs. {home.price || 0} x {totalDays || 0} night
                      {totalDays !== 1 ? "s" : ""} x {formData.guests} guest
                      {Number(formData.guests) !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={!isReservationReady}
                  sx={{
                    backgroundColor: "#65000B",
                    borderRadius: "0.8rem",
                    padding: "0.9rem",
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": {
                      backgroundColor: "#4f0008",
                    },
                  }}
                >
                  Reserve now
                </Button>

                <p className="house-note">You will not be charged yet</p>

                <div className="house-total">
                  <span>Total before taxes</span>
                  <strong>Rs. {totalPrice || 0}</strong>
                </div>

                {user?._id === home?.owner?._id && (
                  <div className="house-actions">
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/edit/${home._id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => setShowConfirm(true)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </aside>
            </form>
          </section>

          {showConfirm && (
            <DeleteHouse
              id={id}
              onClose={() => setShowConfirm(false)}
              onDelete={handleDelete}
            />
          )}
        </div>

        <AddReview listingId={id} refreshListing={fetchListing} />
        <ShowReview
          reviews={home.reviews}
          id={home._id}
          refreshListing={fetchListing}
        />
      </div>

      <Bottom />
    </>
  );
}

export default House;
