// src/pages/EmergencySOS.jsx
import React, { useState } from "react";
import Layout from "../layouts/Layout";
import Footer from "../components/Footer";
import "../styles/personnel-style.css";

const EmergencySOS = () => {
  const [selectedArea, setSelectedArea] = useState("SELECT AREA");
  const [selectedRegion, setSelectedRegion] = useState("LUZON");

  return (
    <Layout>
      <div className="dashboard-content">
        {/* Page Title */}
        <h2 className="page-title">LIVE EMERGENCY FEED</h2>

        {/* Controls */}
        <div className="controls">
          {/* Dropdown for Areas */}
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="dropdown"
          >
            <option value="SELECT AREA">Select Area</option>
            <option value="Metro Manila">Metro Manila</option>
            <option value="Laguna">Laguna</option>
            <option value="Cavite">Cavite</option>
            <option value="Baguio">Baguio</option>
            <option value="Pampanga">Pampanga</option>
            <option value="Bulacan">Bulacan</option>
            <option value="Nueva Ecija">Nueva Ecija</option>
            <option value="Batangas">Batangas</option>
          </select>

          {/* Dropdown for Region */}
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="dropdown"
          >
            <option value="Luzon">Luzon</option>
            <option value="Visayas">Visayas</option>
            <option value="Mindanao">Mindanao</option>
          </select>
        </div>

        {/* Map Container */}
        <div className="map-section">
          <img src="/map-placeholder.png" alt="Emergency Map" className="map-image" />
        </div>

        {/* Alerts Section */}
        <div className="alerts-section">
          <h3 className="section-title">Emergency Alerts</h3>

          <div className="alert-card rescued">
            <p className="alert-id"><strong>[RESCUE-12]</strong> | 14:22</p>
            <p>All civilians accounted for. Evacuation successful.</p>
            <p className="alert-location"><em>Sector 2A - Residential Zone</em></p>
            <p className="alert-status">Status: Rescued</p>
          </div>

          <div className="alert-card rescued">
            <p className="alert-id"><strong>[SCOUT-09]</strong> | 15:45</p>
            <p>Search completed. Everyone rescued, no injuries.</p>
            <p className="alert-location"><em>Sector 3B - School Grounds</em></p>
            <p className="alert-status">Status: Rescued</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </Layout>
  );
};

export default EmergencySOS;
