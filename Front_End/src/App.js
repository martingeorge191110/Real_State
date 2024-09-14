// import NavBar from "./Components/Nav_Bar/navbar";
import AuthPage from "./Pages/Authinticate/authPage";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import { BrowserRouter as Router,
		Route
	, Switch }
	 from 'react-router-dom';
import MainPage from "./Pages/Main/main.js";
import SearchList from "./Pages/Search_List/searchList";
import { useEffect, useState } from "react";
import { tokenValidApi } from "./Services/signIn.js";
import Loading from "./Components/Loading.js/loading.js";
import Post from "./Pages/Single_Post/post.js";
import { userDataApi } from "./Services/userData.js";
import { useDispatch } from "react-redux";
import { staticUserInfAction } from "./Store/action.js";
import Profile from "./Pages/Profile/profile.js";



function App() {

	const dispatch = useDispatch()
	const tokenValid = useSelector(
			state => state.token
	)
	const [authValidRes, setAuthValidRes] = useState({})
	
	/* State For User Data */
	const [userInf, setUserInf] = useState(null)
	/* Loading State */
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		if (tokenValid){
			tokenValidApi(tokenValid).then(
				(response) => {
					setAuthValidRes(response)
					return (response)
				}
			).then(
				(resObj) => userDataApi(tokenValid).then(
					userInfo => {
						if (userInfo.succes)
							setUserInf(userInfo.data)
					}
				)
			)
		} else {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		if (userInf) {
			dispatch(staticUserInfAction(userInf))
			setLoading(false)
		}
	}, [userInf])

	const [valid, setValid] = useState(true)
	useEffect(() => {
		if (authValidRes.succes === false) {
			setValid(false)
			localStorage.removeItem("token")
		}
	}, [authValidRes])

	return (
		<div className="App">
		{ !loading ? (valid ? <Router>
			{/* {tokenValid ? <NavBar/> : ""} */}
			<Switch>
				<Route path="/propertyList" exact component={tokenValid ? SearchList : ""}/>
				<Route path="/propertyList/:id" exact component={tokenValid ? Post : ""}/>
				<Route path="/profile" exact component={tokenValid && userInf ? Profile : ""}/>
				<Route exact component={tokenValid ? MainPage : AuthPage}/>
			</Switch>
		</Router> : < AuthPage />) : <Loading color={"red"}/>}
		</div>
	 );
}

export default App;
