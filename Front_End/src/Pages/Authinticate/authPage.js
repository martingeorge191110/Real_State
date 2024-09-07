import React, { useEffect, useState } from 'react';
import { countries } from 'countries-list';
import { countryListHandler } from '../../Utilis/classHandler';
import './authPage.css';
import { changeInputValue } from '../../Utilis/valueCahnge';
import signUpApi from '../../Services/signUp';
import { useDispatch } from 'react-redux';
import { signUpAction } from '../../Store/action';
import { useSelector } from 'react-redux';

const AuthPage = () => {

	const dispatch = useDispatch()
	/* Sign Up and Sign In states values */
	const [username, setUserename] = useState(null)
	const [useremail, setUseremail] = useState(null)
	const [password, setPassword] = useState(null)
	/* State to hold the selected country */
	const [selectedCountry, setSelectedCountry] = useState(null);
	/* State to be sent with sing up information to back end */
	const [signUpInf, setSignUpInf] = useState({
		username: username,
		useremail: useremail,
		password: password,
		national: selectedCountry
	})
	/* Update the sign up information after change each input */
	useEffect(() => {
		setSignUpInf({
			username: username,
			useremail: useremail,
			password: password,
			national: selectedCountry
		})
	}, [username, useremail, password, selectedCountry])
	/* loading state */
	const [upLoading, setUpLoading] = useState(false)

	const countryArray = Object.entries(countries).map(([code, country]) => ({
		code,
		...country,
	}));

	/* Toggle sign up or sign in form */
	const [isSignUp, setIsSignUp] = useState(false);
	/* store message for errors */
	const [resMess, setResMess] = useState(null)

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

			<button onClick={async (e) => {
				/* Prevent Submit Function */
				e.preventDefault()

				try {
					/* Get the response */
					const respJsonObj = await signUpApi(signUpInf, setUpLoading)
					setResMess(respJsonObj.message)
					setUpLoading(false)
					if (respJsonObj.succes === false) {
						return;
					}
					/* Set the token in the local storage and restate the token in the redux state */
					localStorage.setItem("token", respJsonObj.token)
					dispatch(signUpAction(respJsonObj.token))
				} catch (err) {
					console.error(err)
				}
			}} type="submit" className="auth-button" style={{backgroundColor: `${upLoading ? "#005bb5" : ""}`}}>
				{upLoading ? <div className="d-flex justify-content-center align-items-center background-color-white" >
				<div className="spinner-border text-white" role="status"></div>
		 			</div> : "Sign Up"}
			</button>
					<small>{resMess}</small>
			<p className="auth-link" onClick={toggleAuth}>Already have an account? Sign In</p>
		 </form>
		</div>
	</div>
 </div>
  );
};

export default AuthPage;