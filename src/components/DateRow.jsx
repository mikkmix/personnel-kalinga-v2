// src/components/DateRow.jsx
import React from "react";
import "../styles/topbar.css";

const DateRow = () => {
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options).toUpperCase();
  const weekday = today
    .toLocaleDateString("en-US", { weekday: "long" })
    .toUpperCase();

  return (
    <div className="date-row">
      <span className="date-text">
        <strong>{formattedDate}</strong>{" "}
        <span className="weekday">{weekday}</span>
      </span>
      <div className="dropdowns">
        <select>
          <option>Luzon</option>
          <option>Visayas</option>
          <option>Mindanao</option>
        </select>
        <select>
          <option>All Centers</option>
          <option>Evacuation Center 1</option>
          <option>Evacuation Center 2</option>
          <option>Evacuation Center 3</option>
        </select>
      </div>
    </div>
  );
};

export default DateRow;
