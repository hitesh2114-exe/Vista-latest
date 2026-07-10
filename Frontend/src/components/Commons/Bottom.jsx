import React from "react";
import "./Bottom.css";
import hero_image4 from "../../public/hero-image-6.jpg";

function Bottom() {
  return (
    <footer className="bottom-box">
      <img src={hero_image4} alt="" className="bottom-image" />

      <div className="bottom-overlay"></div>

      <div className="bottom-content">
        <div>
          <p className="bottom-label">Vista Stays</p>
          <h2>Find your next beautiful stay.</h2>
        </div>

        <div className="bottom-links">
          <a href="/">Home</a>
          <a href="/explore-page">Explore</a>
          <a href="/add-home">Add Home</a>
        </div>
      </div>

      <h1 className="bottom-brand">Vista</h1>

      <p className="bottom-copy">© 2026 Vista Stays. All Rights Reserved.</p>
    </footer>
  );
}

export default Bottom;