import React, { useEffect, useState } from 'react';
import './main.css';
import image from '../../Assets/bg.png'
import { changeInputValue } from '../../Utilis/valueCahnge';

const MainPage = () => {
	/* State to change the botton styling (buy or rent) */
  	const [searchType, setSearchType] = useState('buy');

  	/* Search Bar elements States */
	/* City loation state*/
		const [location, setLocation] = useState(null)
	/* Min Price */
		const [minPrice, setMinPrice] = useState(0)
	/* Ma Price */
		const [maxPrice, setMaxPrice] = useState(100)


  	return (
	 	<section className="main-page">
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
						<input onChange={(e) => changeInputValue(e.currentTarget.value, setLocation)} type="text" className='search-bar' placeholder="City Location"/>
						<input onChange={(e) => changeInputValue(Number(e.currentTarget.value), setMinPrice)} type="number" className='search-bar' placeholder="Min Price"/>
						<input onChange={(e) => changeInputValue(Number(e.currentTarget.value), setMaxPrice)} type="number" className='search-bar' placeholder="Max Price"/>
						<button type="submit" className="search-bar btn">Search</button>
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
  );
};

export default MainPage;
