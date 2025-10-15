import React from "react";
import "../styles/triage-style.css";

const triageData = [
  { center: "Evacuation Center 1", low: 124, medium: 4, high: 28, veryHigh: 32, critical: 1 },
  { center: "Evacuation Center 2", low: 102, medium: 56, high: 58, veryHigh: 43, critical: 10 },
  { center: "Evacuation Center 3", low: 73, medium: 34, high: 58, veryHigh: 30, critical: 4 },
  { center: "Evacuation Center 4", low: 55, medium: 50, high: 58, veryHigh: 88, critical: 12 },
];

const TriageCard = () => {
  return (
    <div className="card triage-card">
      <h3 className="card-title">Triage System</h3>

      <div className="triage-table-wrapper">
        <table className="triage-table">
          <thead>
            <tr>
              <th>Evacuation Center</th>
              <th className="low">Low</th>
              <th className="medium">Medium</th>
              <th className="high">High</th>
              <th className="very-high">Very High</th>
              <th className="critical">Critical</th>
            </tr>
          </thead>
          <tbody>
            {triageData.map((row, i) => (
              <tr key={i}>
                <td>{row.center}</td>
                <td className="low">{row.low}</td>
                <td className="medium">{row.medium}</td>
                <td className="high">{row.high}</td>
                <td className="very-high">{row.veryHigh}</td>
                <td className="critical">{row.critical}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="triage-legend">
        <span><span className="legend-dot low"></span> Low</span>
        <span><span className="legend-dot medium"></span> Medium</span>
        <span><span className="legend-dot high"></span> High</span>
        <span><span className="legend-dot very-high"></span> Very High</span>
        <span><span className="legend-dot critical"></span> Critical</span>
      </div>
    </div>
  );
};

export default TriageCard;
