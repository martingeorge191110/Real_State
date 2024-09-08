import NavBar from "./Components/Nav_Bar/navbar";
import AuthPage from "./Pages/Authinticate/authPage";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import {BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom'
import MainPage from "./Pages/Main/main";
import SearchList from "./Pages/Search_List/searchList";



function App() {

	const tokenValid = useSelector(
			state => state.token
	)

	return (
		<>
			<div className="App">
				<Router>
					<Route component={tokenValid ? NavBar : ""}/>
					<Switch> 
						<Route path="/propertyList" exact component={SearchList}/>
						<Route exact component={tokenValid ? MainPage : AuthPage}/>
					</Switch>
				</Router>
			</div>
		</>
	);
}

export default App;
