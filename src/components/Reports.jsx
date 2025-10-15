import React from "react";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";
import "../styles/personnel-style.css"; // Custom card styles

const Reports = () => {
  // 🔹 Data-driven alerts (easier to maintain)
  const immediateAlerts = [
    "Evacuation Center 1 is near full capacity. Assign additional resources.",
    "Aftershocks reported. Conduct safety checks in nearby facilities.",
    "Floodwater subsiding. Initiate sanitation measures in affected areas.",
  ];

  const resourceAlerts = [
    "Evacuation Center 1 requires additional staff deployment.",
    "Evacuation Center 2 needs logistics for food distribution.",
    "Evacuation Center 3 requires additional staff personnel.",
  ];

  return (
    <div className="card reports-card">
      <h3 className="card-title"> Reports</h3>

      {/* Immediate Alerts */}
      <div className="section">
        <h4 className="section-title"> Immediate Alerts</h4>
        <ul className="list">
          {immediateAlerts.map((alert, i) => (
            <li key={i}>
              <FaExclamationTriangle className="icon warning" />
              <span>{alert}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Resource Alerts */}
      <div className="section">
        <h4 className="section-title"> Resource Alerts</h4>
        <ul className="list">
          {resourceAlerts.map((alert, i) => (
            <li key={i}>
              <FaHome className="icon resource" />
              <span>{alert}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;
