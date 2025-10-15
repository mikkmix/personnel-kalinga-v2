// src/pages/TriageSystem.jsx
import React, { useState } from "react";
import Layout from "../layouts/Layout";
import "../styles/personnel-style.css";
import Footer from "../components/Footer";

const TriageSystem = () => {
  const [selectedLocation, setSelectedLocation] = useState("Location 1");

  const locations = ["Location 1", "Location 2", "Location 3", "Location 4", "Location 5"];

  const data = {
    "Location 1": [
      { center: "Evacuation Center 1", values: [124, 4, 28, 32, 1] },
      { center: "Evacuation Center 2", values: [102, 56, 58, 43, 10] },
      { center: "Evacuation Center 3", values: [73, 34, 58, 30, 4] },
      { center: "Evacuation Center 4", values: [55, 50, 58, 88, 12] },
    ],
    "Location 2": [
      { center: "Evacuation Center A", values: [90, 30, 22, 15, 2] },
      { center: "Evacuation Center B", values: [110, 44, 32, 28, 6] },
      { center: "Evacuation Center C", values: [65, 25, 30, 40, 5] },
    ],
    "Location 3": [
      { center: "Evacuation Hub 1", values: [120, 35, 40, 22, 8] },
      { center: "Evacuation Hub 2", values: [75, 20, 15, 10, 1] },
    ],
    "Location 4": [
      { center: "Safe Zone 1", values: [95, 15, 20, 12, 4] },
      { center: "Safe Zone 2", values: [80, 18, 25, 30, 7] },
    ],
    "Location 5": [
      { center: "Relief Center 1", values: [140, 20, 18, 25, 3] },
      { center: "Relief Center 2", values: [60, 22, 19, 15, 6] },
    ],
  };

  const alerts = [
    { text: "Evacuation Center 1 - Location 3 has reached max capacity for critical cases (15 individuals). Immediate medical support needed.", level: "critical" },
    { text: "4 unconscious individuals reported at Evacuation Center 2, Location 1.", level: "critical" },
  ];

  const highlights = [
    { text: "Medium vulnerability cases at Location 2 have doubled in the last 3 hours.", level: "medium" },
    { text: "Surge in High severity cases among elderly in Center 1, Location 3.", level: "high" },
    { text: "Location 3 shows consistent spike in Critical and Very High levels across all centers.", level: "veryHigh" },
  ];

  const badge = {
    low: "🟢 Low",
    medium: "🟡 Medium",
    high: "🟠 High",
    veryHigh: "🔥 Very High",
    critical: "🔴 Critical",
  };

  return (
    <Layout>
      <div className="content">

        {/* === PAGE TITLE === */}
        <div className="page-header">
          <h1 className="page-title">Triage System</h1>
        </div>

        {/* === TRIAGE CARD === */}
        <div className="triage-card">
          <div className="triage-header">
            <h2 className="triage-title">{selectedLocation}</h2>
            <select
              className="triage-dropdown"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((loc, i) => (
                <option key={i} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* TABLE WRAPPER */}
          <div className="table-container">
            <table className="triage-table">
              <thead>
                <tr>
                  <th>Evacuation Center</th>
                  <th>Low</th>
                  <th>Medium</th>
                  <th>High</th>
                  <th>Very High</th>
                  <th>Critical</th>
                </tr>
              </thead>
              <tbody>
                {data[selectedLocation].map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.center}</td>
                    <td className="cell low">{row.values[0]}</td>
                    <td className="cell medium">{row.values[1]}</td>
                    <td className="cell high">{row.values[2]}</td>
                    <td className="cell veryHigh">{row.values[3]}</td>
                    <td className="cell critical">{row.values[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* === LEGEND === */}
          <div className="legend">
            <div className="legend-item">{badge.low}</div>
            <div className="legend-item">{badge.medium}</div>
            <div className="legend-item">{badge.high}</div>
            <div className="legend-item">{badge.veryHigh}</div>
            <div className="legend-item">{badge.critical}</div>
          </div>
        </div>

        {/* === CRITICAL ALERTS === */}
        <div className="alerts-card">
          <h3>Critical Case Alerts</h3>
          {alerts.map((a, i) => (
            <div key={i} className="alert-item">
              <span className={`badge ${a.level}`}>{badge[a.level]}</span> {a.text}
            </div>
          ))}
        </div>

        {/* === REAL-TIME HIGHLIGHTS === */}
        <div className="highlights-card">
          <h3>Real-Time Highlights</h3>
          {highlights.map((h, i) => (
            <div key={i} className="highlight-item">
              <span className={`badge ${h.level}`}>{badge[h.level]}</span> {h.text}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </Layout>
  );
};

export default TriageSystem;
