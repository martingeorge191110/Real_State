import React, { useEffect, useState } from 'react';
import './searchList.css';
import { FaMapMarkerAlt, FaBed, FaBath, FaHeart, FaCommentDots } from 'react-icons/fa';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import L from "leaflet"
import imgUrl2 from '../../Assets/marker-shadow.png'
import imgUrl1 from '../../Assets/marker-icon.png'
import { Link } from 'react-router-dom';
import NavBar from '../../Components/Nav_Bar/navbar';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { searchPropApi } from '../../Services/searchProperty';
import Loading from '../../Components/Loading.js/loading';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';



const SearchList = () => {
	const history = useHistory()

	const token = useSelector(
		state => state.token
	)

	/* Loading State */
	const [loading, setLoading] = useState(true)
	/* Query url search */
	const query = new URLSearchParams(useLocation().search)
	const [resp, setResp] = useState(null)

	/* Call Api For Searching propery List */
	useEffect(() => {
		searchPropApi(
			query.get("city"),
			query.get("minPrice"),
			query.get("maxPrice"),
			token,
			setLoading
		).then(resObj => setResp(resObj))
	} , [])
	// console.log(resp.data)
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
console.log(resp)
	return (
		<>
		<NavBar/>
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
					{ !loading ? ( 
						resp && resp.succes && resp.data && resp.data.length > 0 ? resp.data.map((property) => {
						return (
							<div key={property.post._id} className="search-result-item">
								<img onClick={() => {
									history.push({
										pathname: `/propertyList/${property.post._id}`
									})
								}} src={property.post.images[0]} alt="Property" className="result-img" />
								<div className="result-details">
									<h3 className="result-title">{property.post.title}</h3>
									<p className="result-location"><FaMapMarkerAlt /> {property.post.address}</p>
									<p className="result-price">${property.post.price}</p>
									<div className="result-fet-act">
										<div className="result-features">
											<span><FaBed /> {property.post.bedroom}</span>
											<span><FaBath /> {property.post.bathroom}</span>
										</div>
										<div className="result-actions">
											<FaHeart className="result-icon" />
											<FaCommentDots className="result-icon" />
										</div>
									</div>
								</div>
							</div>
						)
					}) : <div className='search-result-item'>
								<div className='result-details'>
									<h3 className='result-title'>
										No Posts Found with your Requirements!
									</h3>
								</div>
						</div>
					) : <Loading color={"red"}/>}
					{/* Repeat the search-result-item div for more results */}
				</div>
			</div>
			<div className="map-section">
			<MapContainer center={position} zoom={7} style={{ position: "absolute", top: "0" , width: "80%", height: "100vh", borderRadius:"1rem"}}>
    		<TileLayer
      		url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      		attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    		/>
    		{
					resp && resp.succes && resp.data && resp.data.length > 0 ? resp.data.map((property) => {
						return (
							<Marker position={[property.post.latitude, property.post.longitude]} icon={customIcon}>
      					<Popup>
								<div key={property._id} className="popupContainer">
          					<img src={property.post.images[0]} alt="" />
          					<div className="textContainer">
            					<Link to={`/propertyList/${property.post._id}`}> {property.post.title}</Link>
            					<span>{property.post.bedRoom} bedroom</span>
            					<b>$ {property.post.price}</b>
          					</div>
        					</div>
								</Popup>
    					</Marker>
						)
					}) : ""
				}
  		</MapContainer>
			</div>
		</div>
		</>
	);
};

export default SearchList;
