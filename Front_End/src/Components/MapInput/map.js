import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Loading from "../Loading.js/loading";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMarker = ({ position, setPosition, onLocationSelect }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelect({ lat, lng });
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};


const MapCmp = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false)

  const searchLocation = async () => {
    if (searchTerm) {
      setLoading(true)
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json&limit=1`, {
          method: "GET",
        });
        const data = await res.json();

        setLoading(false)
        if (data.length > 0) {
          const { lat, lon } = data[0];
          const coords = [parseFloat(lat), parseFloat(lon)];
          setPosition(coords);
          onLocationSelect({ lat: parseFloat(lat), lng: parseFloat(lon) });
        } else {
          alert("Location not found.");
        }
      } catch (error) {
        setLoading(false)
        console.error(error);
        alert("Error fetching location data.");
      }
    }
  };

  return (
    <div className="map-cmp-container">
      <input
        type="text"
        placeholder="Search for an address"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button style={{pointerEvents: loading ? "none" : "", backgroundColor: loading? '#005bb5': "#0073e6"}} onClick={(e) => {e.preventDefault(); searchLocation()}} className="search-button">
        {
          loading ? <Loading/> : "Search Address"
        }
      </button>

        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          className="map-container"
        > 
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationMarker position={position} setPosition={setPosition} onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
};

export default MapCmp;
