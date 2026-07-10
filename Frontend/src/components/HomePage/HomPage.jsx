import React from "react";
import LandingPage from "./LandingPage";
import BelowLandingPageOne from "./BelowLandingPageOne";
import BelowLandingPageTwo from "./BelowLandingPageTwo";
import BelowLandingPageThree from "./BelowLandingPageThree";
import BelowLandingPageFour from "./BelowLandingPageFour";
import ForUSA from "./ForUSA";
import ForCanada from "./ForCanada";
import Bottom from "../Commons/Bottom";
import TestUpload from "../../TestUpload";

function HomePage() {
  return (
    <>
      <LandingPage />
      <BelowLandingPageOne />
      <BelowLandingPageTwo />
      <BelowLandingPageThree />
      <BelowLandingPageFour />
      <ForUSA />
      <ForCanada />
      <Bottom />
      {/* <TestUpload/> */}
    </>
  );
}

export default HomePage;
