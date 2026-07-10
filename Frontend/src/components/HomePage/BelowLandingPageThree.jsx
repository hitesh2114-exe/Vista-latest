import React from "react";
import "./BelowLandingPageThree.css";
import hero_image4 from "../../public/hero-image-3.jpg";

function BelowLandingPageThree() {
  return (
    <>
      <div className="below-landingpage-three">
        <img
          src={hero_image4}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </>
  );
}

export default BelowLandingPageThree;
