import NavBar from "./Components/Nav_Bar/navbar";
import AuthPage from "./Pages/Authinticate/authPage";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import {BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom'



function App() {
	localStorage.clear()
	const tokenValid = useSelector(
			state => state.token
	)

	return (
		<>
			<div className="App">
				<Router>
					<Switch>
						<Route exact component={tokenValid ? NavBar : AuthPage}/> 
					</Switch>
				</Router>
			</div>
		</>
	);
}

export default App;
