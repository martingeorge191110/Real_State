import React, { useEffect, useState } from "react";
import MapCmp from "../../Components/MapInput/map.js";
import "./mapPage.css";
import NavBar from "../../Components/Nav_Bar/navbar.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.js";

const MapForm = ({setNewPost , newPost}) => {
	const history = useHistory().location.state
	const sendHistory = useHistory()
	const [location, setLocation] = useState({ lat: null, lng: null });

	const handleLocationSelect = (coords) => {
		setLocation(coords);
	};

	useEffect(() => {
		if (location)
			setNewPost({...newPost, latitude: location.lat, longitude: location.lng})
	}, [location])

	const handleSubmit = async (e) => {
		e.preventDefault();
		history.latitude = location.lat
		history.longitude = location.lng
		console.log(history)
	};

	return (
		<>
		<div className="map-form-container">
			<h2>Select Your Address</h2>
			<form onSubmit={handleSubmit} className="map-form">
				<MapCmp onLocationSelect={handleLocationSelect} />
				<button onClick={(e) => {
					e.preventDefault()
				}} type="submit" className="submit-button">
					Submit Address
				</button>
			</form>
		</div>
		</>
	);
};

export default MapForm;
