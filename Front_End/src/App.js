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



function App() {

	const tokenValid = useSelector(
			state => state.token
	)
	const [authValidRes, setAuthValidRes] = useState({})
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		if (tokenValid){
			tokenValidApi(tokenValid, setLoading).then(
				(response) => {
					setAuthValidRes(response)
				}
			)
		} else {
			setLoading(false)
		}
	}, [])

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
				<Route exact component={tokenValid ? MainPage : AuthPage}/>
			</Switch>
		</Router> : < AuthPage />) : <Loading color={"red"}/>}
		</div>
	 );
}

export default App;
