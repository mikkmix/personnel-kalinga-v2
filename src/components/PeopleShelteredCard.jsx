import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const PeopleShelteredCard = () => {
  const data = [
    { name: "Evacuated", value: 600 },
    { name: "In Shelters", value: 400 },
    { name: "Unaccounted", value: 200 },
  ];

  const COLORS = ["#1A4718", "#FEC700", "#cf0909ff"];

  return (
    <div className="card">
      <h3>People Sheltered</h3>
      <div className="chart-container">
        <PieChart width={250} height={280}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default PeopleShelteredCard;
