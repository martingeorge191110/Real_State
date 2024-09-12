import React, {  useState } from 'react';
import './main.css';
import image from '../../Assets/bg.png'
import { changeInputValue } from '../../Utilis/valueCahnge';
import { inputsValid, searchProperties } from '../../Utilis/searchProperty';
import { useDispatch } from 'react-redux';
import { propSearchAction } from '../../Store/action';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import NavBar from '../../Components/Nav_Bar/navbar'
import { countriesList } from '../../Data/searchData';
import { FaSleigh } from 'react-icons/fa';

const MainPage = () => {

	const history = useHistory()
	const dispatch = useDispatch()
	/* State to change the botton styling (buy or rent) */
  	const [searchType, setSearchType] = useState('buy');

  	/* Search Bar elements States */
	/* City loation state*/
		const [location, setLocation] = useState(null)
		const [cityValid, setCityValid] = useState(false)
		const [cityList, setCityList] = useState([])

	/* Min Price */
		const [minPrice, setMinPrice] = useState(0)
	/* Ma Price */
		const [maxPrice, setMaxPrice] = useState(Number.MAX_SAFE_INTEGER)
	/* Search Validation State */
		const [valid, setValid] = useState(true)

  	return (
		<>
		<NavBar/>
	 	<section className="main-page" onClick={() => {
			setCityValid(false)
		}}>
			<div className="main-content">
		  		<div className="text-section">
			 		<h1 className="main-title">Welcome to Our Real Estate Platform</h1>
			 		<p className="main-description">
						Discover your dream home or find the perfect location for your business. Our platform
						offers a wide range of options for buying and renting properties.
			 		</p>
			 	<div className="search-section">
					<div className="search-buttons">
				  		<button type="button"
					 		className={`search-btn ${searchType === 'buy' ? 'active' : ''}`} 
					 		onClick={() => setSearchType('buy')}
				  		>
					 		Buy
				  		</button>
				  		<button type="button"
					 		className={`search-btn ${searchType === 'rent' ? 'active' : ''}`} 
					 		onClick={() => setSearchType('rent')}
				  		>
							Rent
				  		</button>
					</div>
					<form className="search-form">
						<input type="text" className="search-bar" placeholder={`Search for ${searchType === 'buy' ? 'buying' : 'renting'}...`}/>
						{ cityValid && cityList.length > 0 ?
							<ul className="c-list">
								{
									cityList.map((city, i) => {
										return (
											<li key={i} onClick={(e) => {
												setLocation(e.currentTarget.textContent)
											}}>{ city }</li>
										)
									})
								}
							</ul> : ""
						}	
						<input onChange={(e) => {
							const arr = countriesList(e.currentTarget.value);
							setCityList(arr)
							setCityValid(true)
							if (e.currentTarget.value === "")
								setCityValid(false)
							changeInputValue(e.currentTarget.value, setLocation)
							}} type="text" className='search-bar' value={location} placeholder="City Location" required/>
						<input onChange={(e) => changeInputValue(Number(e.currentTarget.value), setMinPrice)} value={minPrice} type="number" className='search-bar' placeholder="Min Price"/>
						<input onChange={(e) => changeInputValue(Number(e.currentTarget.value), setMaxPrice)} value={maxPrice} type="number" className='search-bar' placeholder="Max Price"/>
						<button onClick={(e) => {
							if (!inputsValid(location))
							{
								setValid(false)
								return;
							}
							const searchObj = searchProperties(e, location, minPrice, maxPrice)
							dispatch(propSearchAction(searchObj))
							history.push(`/propertyList?city=${searchObj.cityLocation}&minPrice=${searchObj.minPrice}&maxPrice=${searchObj.maxPrice}`)
							
							}} type="submit" className="search-bar btn">Search</button>
							{!valid ? <i className='text-red'></i> : ""}
					</form> 
				</div>
			 	<div className="info-section">
					<div className="info-box">
				  		<h3>Experience</h3>
				  		<p>20 Years of experience in the real estate industry.</p>
					</div>
					<div className="info-box">
				  		<h3>Awarded Prizes</h3>
				  		<p>Recognized as the best real estate platform in 2021.</p>
					</div>
					<div className="info-box">
				  		<h3>Available Properties</h3>
				  		<p>Over 1,000 properties available for buying and renting.</p>
					</div>
			 	</div>
		  	</div>
		  		<div className="image-section">
			 	<img src={image} alt="Real Estate" className="main-image" />
		  		</div>
			</div>
		</section>
		</>
  );
};

export default MainPage;
