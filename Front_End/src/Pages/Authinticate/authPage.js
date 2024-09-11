import React, { useEffect, useState } from 'react';
import { countries } from 'countries-list';
import { countryListHandler } from '../../Utilis/classHandler';
import './authPage.css';
import { changeInputValue } from '../../Utilis/valueCahnge';
import signUpApi from '../../Services/signUp';
import { useDispatch } from 'react-redux';
import { signInAction, signUpAction } from '../../Store/action';
import { signInApi } from '../../Services/signIn';
import { forPassSiInHandler } from '../../Services/passForgetHandler';
import { sendGenCodeMail, resetPassApi } from '../../Services/resetPass';
import { compareCode } from '../../Utilis/compareCodes';
import Loading from '../../Components/Loading.js/loading';

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
	/* State to be sent sign in information */
	const [signInInf, setSignInInf] = useState({
		useremail: useremail,
		password: password
	})
	/* Update the sign up and sign in information after change each input */
	useEffect(() => {
		setSignInInf({
			useremail: useremail,
			password: password
		})
		setSignUpInf({
			username: username,
			useremail: useremail,
			password: password,
			national: selectedCountry
		})
	}, [username, useremail, password, selectedCountry])
	/* loading state */
	const [upLoading, setUpLoading] = useState(false)
	const [inLoading, setInLoading] = useState(false)

	/* Forget password process */
	/* State determine which status the inputs in (open inputs which holds generated code process) */
	const [fpClick, setFpClick] = useState(false)
	/* State to hold generated code */
	const [gencode, setGencode] = useState(null)
	/* State to hold the input generated code */
	const [genInput, setGenInput] = useState(null)
	/* state to determine whether user provide same code or not */
	const [codeChecker, setCodeChecker] = useState(false)
	/* Final method in resiting password */
	const [resetPassMess, setresetPassMess] = useState(null)
	useEffect(() => {
		setTimeout(() => {
			setresetPassMess(false)
		}, 2000);
	}, [resetPassMess])

	const countryArray = Object.entries(countries).map(([code, country]) => ({
		code,
		...country,
	}));

	/* Toggle sign up or sign in form */
	const [isSignUp, setIsSignUp] = useState(false);
	/* store message for errors 1-sign up, 2-sign in */
	const [resMess, setResMess] = useState(null)
	const [resMessTwo, setResMessTwo] = useState(null)

  const toggleAuth = () => {
		setIsSignUp(!isSignUp);
  };

  return (
	<div className="auth-container">
	<div className={`auth-card ${isSignUp ? 'auth-card-flip' : ''}`}>
	  <div className="auth-front">
		<h2>{!codeChecker && !fpClick ? "Sign In": "Reset Password"}</h2>
		<form className="auth-form">
			<input onChange={(e) => {changeInputValue(e.currentTarget.value, setUseremail)}} type="email" placeholder="Email" required />
			{!fpClick && !codeChecker ? <input onChange={(e) => {changeInputValue(e.currentTarget.value, setPassword)}} type="password" placeholder="Password" required /> : ""}
			{codeChecker ? <input onChange={(e) => {changeInputValue(e.currentTarget.value, setPassword)}} type="password" placeholder="New Password" required /> : ""}
			{ gencode ? <input onChange={(e) => {changeInputValue(e.currentTarget.value, setGenInput)}} type="number" placeholder="Generated Code" required /> : ""}

			{!fpClick && !codeChecker ? <button onClick={ async (e) => {
				e.preventDefault()

				try {
					const respJsonObj = await signInApi(signInInf, setInLoading)

					setResMessTwo(respJsonObj.message)
					setInLoading(false)
					if (!respJsonObj.succes)
						return;

					localStorage.setItem("token", respJsonObj.token)
					dispatch(signInAction(respJsonObj.token))
				} catch (err) {
					console.error(err)
				}
			}} type="submit" className="auth-button">{inLoading ?
					<Loading /> :"Sign In"}</button> : ""}

			{codeChecker ? <button onClick={(e) => {resetPassApi(e, setCodeChecker, signInInf, setInLoading).then(resObj => setresetPassMess(resObj.message))}} type="submit" className="auth-button">Reset Password</button> : ""}
			{gencode ? <button onClick={() => {
				if (compareCode(gencode, genInput))
				{
					setCodeChecker(true)
					setFpClick(false)
					setGencode(null)
				}
				}} type="submit" className="auth-button">Submit Code</button> : ""}
			{fpClick ? <button onClick={(e) => {sendGenCodeMail(e, useremail, setInLoading, setResMessTwo).then(resObj => setGencode(resObj.code))}} className="auth-button">{inLoading ? 
			<Loading /> :"Send Generated code in Mail"}</button> : ""}
			<small>{resMessTwo}</small>
			{ codeChecker ? "" : <p className="auth-link" onClick={toggleAuth}>Don't have an account? Sign Up</p>}
			<p onClick={() => {
				forPassSiInHandler(fpClick, setFpClick)
			}} className="auth-link">{codeChecker ? "" : !fpClick ? "Forgot Password" : "Sign In"}</p>
			<small>{resetPassMess}</small>
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
				{/* Sign Up click function handler */}
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
				{upLoading ? <Loading/> : "Sign Up"}
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