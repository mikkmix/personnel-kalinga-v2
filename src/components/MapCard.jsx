import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapCard = () => {
  return (
    <div className="card">
      <h3>Evacuation Centers Map</h3>
      <div style={{ height: "400px", width: "100%", borderRadius: "10px", overflow: "hidden" }}>
        <MapContainer
          center={[14.5995, 120.9842]} // Manila
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={[14.5995, 120.9842]}>
            <Popup>Manila Evacuation Center</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapCard;
