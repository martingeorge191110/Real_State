import React, { useState } from 'react';
import './searchList.css';
import { listData } from '../../Data/searchData';
import { FaMapMarkerAlt, FaBed, FaBath, FaHeart, FaCommentDots } from 'react-icons/fa';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from "leaflet"
import imgUrl2 from '../../Assets/marker-shadow.png'
import imgUrl1 from '../../Assets/marker-icon.png'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';



const SearchList = () => {
	/* Map Information */
	const position = [51.505, -0.09]
	const customIcon = new L.Icon({
			iconUrl:imgUrl1,
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowUrl: imgUrl2,
		shadowSize: [41, 41]
	});

	/* State that hold the searching elemetns */
	const [dataList, setDataList] = useState(listData)

	return (
		<div className="search-list-page">
			<div className="search-section">
				<div className="search-form">
					<input type="text" placeholder="City Location" className="search-input" />
					<select className="search-input">
						<option value="" disabled selected>Type</option>
						<option value="buy">Buy</option>
						<option value="rent">Rent</option>
						<option value="lease">Lease</option>
					</select>
					<select className="search-input">
						<option value="" disabled selected>Property</option>
						<option value="house">House</option>
						<option value="apartment">Apartment</option>
						<option value="condo">Condo</option>
					</select>
					<input type="number" placeholder="Min Price" className="search-input" />
					<input type="number" placeholder="Max Price" className="search-input" />
					<button className="search-button">Search</button>
				</div>
				<div className="results-list">
					{ dataList.map((property) => {
						return (
							<div key={property.id} className="search-result-item">
								<img src={property.images[0]} alt="Property" className="result-img" />
								<div className="result-details">
									<h3 className="result-title">{property.title}</h3>
									<p className="result-location"><FaMapMarkerAlt /> {property.address}</p>
									<p className="result-price">${property.price}</p>
									<div className="result-fet-act">
										<div className="result-features">
											<span><FaBed /> {property.bedroom}</span>
											<span><FaBath /> {property.bathroom}</span>
										</div>
										<div className="result-actions">
											<FaHeart className="result-icon" />
											<FaCommentDots className="result-icon" />
										</div>
									</div>
								</div>
							</div>
						)
					})
					}
					{/* Repeat the search-result-item div for more results */}
				</div>
			</div>
			<div className="map-section">
			<MapContainer center={position} zoom={7} style={{ width: "80%", height: "100vh", borderRadius:"1rem"}}>
    		<TileLayer
      		url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      		attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    		/>
    		{
					dataList.map((property) => {
						return (
							<Marker position={[property.latitude, property.longitude]} icon={customIcon}>
      					<Popup>
									<div key={property.id} className="popupContainer">
          					<img src={property.images[0]} alt="" />
          					<div className="textContainer">
            					<Link /*to={`/${property.id}`}*/> {property.title}</Link>
            					<span>{property.bedroom} bedroom</span>
            					<b>$ {property.price}</b>
          					</div>
        					</div>
								</Popup>
    					</Marker>
						)
					})
				}
  		</MapContainer>
			</div>
		</div>
	);
};

export default SearchList;
