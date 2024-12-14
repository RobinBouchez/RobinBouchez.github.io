import React, { useState } from "react";

import "./BookingForm.css";

const BookingComponent = () => {
  const [activeTab, setActiveTab] = useState("credits");
  const [nights, setNights] = useState(7);
  const serviceFee = 210;
  const cleaningFee = 200;
  const totalCost = `$${serviceFee + cleaningFee}`;
  const averageCost = "$1,230+";

  return (
    <div className="bookingContainer">
      <div className="header">I would like to...</div>

      <div className="tab-container">
        <div
          className={`tab ${activeTab === "credits" ? "active" : "inactive"}`}
          onClick={() => setActiveTab("credits")}
        >
          Stay with credits
        </div>
        <div
          className={`tab ${activeTab === "swap" ? "active" : "inactive"}`}
          onClick={() => setActiveTab("swap")}
        >
          Swap homes
        </div>
      </div>

      <div className="slider-container">
        <div className="slider-label">{nights} Nights</div>
        <input
          type="range"
          className="slider"
          min="1"
          max="30"
          value={nights}
          onChange={(e) => setNights(e.target.value)}
        />
      </div>

      <div className="details">
        <div className="detail-item">
          <span>Credits</span>
          <span>{nights} Credits</span>
        </div>
        <div className="detail-item">
          <span>Service fee</span>
          <span>${serviceFee}</span>
        </div>
        <div className="detail-item">
          <span>Cleaning fee</span>
          <span>${cleaningFee}</span>
        </div>
      </div>

      <div className="total">
        <span>Total</span>
        <span>
          {nights} Credits + {totalCost}
        </span>
      </div>

      <div className="footer">
        <button className="primary-button">Apply and book</button>
        <button className="secondary-button">Learn how it works</button>
      </div>

      <div className="info">The avg. cost in London is {averageCost}</div>
    </div>
  );
};

export default BookingComponent;
