import React from "react";
import WeatherCard from "../components/WeatherCard";
import HealthRespondersCard from "../components/HealthRespondersCard";
import PeopleShelteredCard from "../components/PeopleShelteredCard";
import "../styles/personnel-style.css"; // reuse same css file

const Cards = () => {
  return (
    <div className="cards-row">
      <WeatherCard />
      <HealthRespondersCard />
      <PeopleShelteredCard />
    </div>
  );
};

export default Cards;
