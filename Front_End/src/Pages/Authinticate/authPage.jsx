import React, { useEffect, useState } from 'react';
import { countries } from 'countries-list';
import { countryListHandler } from '../../Utilis/classHandler';
import './authPage.css';
import { changeInputValue } from '../../Utilis/valueCahnge';

const AuthPage = () => {

	/* Sign Up and Sign In states values */
	const [username, setUserename] = useState("")
	const [useremail, setUseremail] = useState("")
	const [password, setPassword] = useState("")
	/* State to hold the selected country */
	const [selectedCountry, setSelectedCountry] = useState('');

	const countryArray = Object.entries(countries).map(([code, country]) => ({
		code,
		...country,
	}));

	/* Toggle sign up or sign in form */
	const [isSignUp, setIsSignUp] = useState(false);

  const toggleAuth = () => {
		setIsSignUp(!isSignUp);
  };

  return (
	<div className="auth-container">
	<div className={`auth-card ${isSignUp ? 'auth-card-flip' : ''}`}>
	  <div className="auth-front">
		 <h2>Sign In</h2>
		 <form className="auth-form">
			<input onChange={(e) => {changeInputValue(e.currentTarget.value, setUseremail)}} type="email" placeholder="Email" required />
			<input onChange={(e) => {changeInputValue(e.currentTarget.value, setPassword)}} type="password" placeholder="Password" required />
			<button type="submit" className="auth-button">Sign In</button>
			<p className="auth-link" onClick={toggleAuth}>Don't have an account? Sign Up</p>
			<p className="auth-link">Forgot Password?</p>
		 </form>
	  </div>
	  <div className="auth-back">
		 <h2>Sign Up</h2>
		 <form className="auth-form">
			<input onChange={(e) => {changeInputValue(e.currentTarget.value, setUserename)}} type="text" placeholder="Username" required />
			<input onChange={(e) => {changeInputValue(e.currentTarget.value, setUseremail)}} type="email" placeholder="Email" required />
			<input onChange={(e) => {changeInputValue(e.currentTarget.value, setPassword)}} type="password" placeholder="Password" required />
			<div className="countries-list">
				<label onClick={(e) => countryListHandler(e.currentTarget, ["rotate", "display"])} className='label-country'>{selectedCountry || 'Choose Country'} <i className="bi bi-chevron-down"></i></label>
				<ul>
					{
					countryArray.map((country, index) => {
						return (
							<li onClick={(e) => {
								setSelectedCountry(country.name)
								e.currentTarget.parentElement.classList.remove("display")
							}} key={index}>{country.name} <span>({country.code})</span></li>
						)
					})
				}
				</ul>
			</div>
			<button type="submit" className="auth-button">Sign Up</button>
			<p className="auth-link" onClick={toggleAuth}>Already have an account? Sign In</p>
		 </form>
	  </div>
	</div>
 </div>
  );
};

export default AuthPage;