import { useEffect, useState } from "react";
import Navbar from "../Commons/Navbar";
import "./Profile.css";
import MyListings from "./MyListings";
import MyTrips from "./MyTrips";
import Reservations from "./Reservations";
import LuggageOutlinedIcon from "@mui/icons-material/LuggageOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const sections = [
  {
    id: "trips",
    label: "My Trips",
    eyebrow: "Guest dashboard",
    title: "Your upcoming stays",
    copy: "Keep track of places you booked and manage travel plans from one calm space.",
    icon: LuggageOutlinedIcon,
  },
  {
    id: "listings",
    label: "My Listings",
    eyebrow: "Host dashboard",
    title: "Homes you host",
    copy: "Review your published stays and jump back into each listing when you need changes.",
    icon: HomeWorkOutlinedIcon,
  },
  {
    id: "reservation",
    label: "Reservations",
    eyebrow: "Host calendar",
    title: "Guest reservations",
    copy: "See who booked your homes, dates, totals, and reservation status at a glance.",
    icon: CalendarMonthOutlinedIcon,
  },
];

function Profile() {
  const [activeSection, setActiveSection] = useState(() => {
    return localStorage.getItem("profileSection") || "trips";
  });

  useEffect(() => {
    localStorage.setItem("profileSection", activeSection);
  }, [activeSection]);

  const active = sections.find((section) => section.id === activeSection) || sections[0];

  return (
    <>
      <Navbar />
      <main className="profile-outer-box">
        <section className="profile-shell">
          <aside className="profile-sidebar">
            <div className="profile-user-card">
              <div className="profile-avatar">V</div>
              <div>
                <p>Vista profile</p>
                <h1>My Profile</h1>
              </div>
            </div>

            <nav className="profile-tabs" aria-label="Profile sections">
              {sections.map((section) => {
                const Icon = section.icon;

                return (
                  <button
                    key={section.id}
                    className={`profile-tab ${
                      activeSection === section.id ? "profile-tab-active" : ""
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <Icon fontSize="small" />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <section className="profile-content">
            <header className="profile-hero">
              <p>{active.eyebrow}</p>
              <h2>{active.title}</h2>
              <span>{active.copy}</span>
            </header>

            <div className="profile-section-body">
              {activeSection === "trips" && <MyTrips />}
              {activeSection === "listings" && <MyListings />}
              {activeSection === "reservation" && <Reservations />}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

export default Profile;
