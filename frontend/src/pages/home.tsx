import React from "react";
import './home.css'

import ContentPage from "../components/ContentGrid/contentPage";
import UniFilters from "../components/Filters/UniFilters";
import QuestionsAccordion from "../components/QuestionsAcc/QuestionsAccordion";

function Home() {
  return (
    <div className="homeContainer">
      <div className="hero">
        <div className="heroText">
          <h1>
            Swap Spaces,
          </h1>
          <h1>
            Find Your Perfect Room
          </h1>
          <p>
            Connect with students nationwide to exchange housing and discover your ideal living space.
          </p>
        </ div>
        <div className="heroButtons">
          <button>
            Get Started
          </button>
          <button>
            Learn More
          </button>
        </div>
      </div>

      <div className="universityFilters">
        {/* <UniFilters /> */}
      </div>
      <div className="ContentGridCards">
        <ContentPage />
      </div>
      <div className="questionsAccordion">
        <QuestionsAccordion />
      </div>

    </div>
  );
}

export default Home;
