import React, { useState } from "react";
import "./Navbar.css";
import image from "../../public/hero-image-3.jpg";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <img src={image} alt="" className="navbar-bg" />

      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          Vista
        </Link>

        <button
          className="navbar-menu-btn"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`navbar-links ${open ? "open" : ""}`}>
          <NavLink to="/add-home" onClick={() => setOpen(false)}>
            Add Home
          </NavLink>

          <NavLink to="/explore-page" onClick={() => setOpen(false)}>
            Explore
          </NavLink>

          <NavLink to="/my-profile" onClick={() => setOpen(false)}>
            My Profile
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
