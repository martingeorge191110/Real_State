import React, {useRef} from "react";
import './navbar.css'
import { useDispatch } from "react-redux";
import { logOutAction } from "../../Store/action";
import { useSelector } from "react-redux";

const NavBar = () => {

	/* Profile list using ref */
	const profileList = useRef(null)
	/* Dispatch for log out */
	const dispatch = useDispatch()
	/* Select User Infromation Item */
	const userInfo = useSelector(
		state => state.staticUserInf
	)


	return (
	  <nav className="navbar">
		 <div className="navbar-container">
			<div className="navbar-logo">
				<a href="/" className="navbar-title">Real State</a>
			  		</div>
			<input type="checkbox" id="navbar-toggle" className="navbar-toggle" />
			<label htmlFor="navbar-toggle" className="navbar-icon">
			  	<span className="navbar-line"></span>
			  	<span className="navbar-line"></span>
			  	<span className="navbar-line"></span>
			</label>
			<ul className="navbar-menu">
				<li className="navbar-item"><a href="#home" className="navbar-link">Home</a></li>
			  	<li className="navbar-item"><a href="#about" className="navbar-link">About</a></li>
			  	<li className="navbar-item"><a href="#contact" className="navbar-link">Contact</a></li>
			  	<li className="navbar-item"><a href="#agent" className="navbar-link">Agent</a></li>
			  	<li 
				 	className="navbar-item navbar-profile" 
				 	onMouseEnter={ () =>
						profileList.current.classList.add("active-prof")
					} 
				 	onMouseLeave={ () =>
						profileList.current.classList.remove("active-prof")
					}
			  	>
				 	<div className="navbar-profile-container">
						<img src={''} alt="Profile" className="navbar-profile-pic" />
						<span className="navbar-profile-name">{userInfo.username}</span>
				 	</div>
				 	{
						<ul ref={profileList} className="navbar-profile-dropdown">
					  		<li className="navbar-profile-dropdown-item">My Profile</li>
					  	<li onClick={() => {
							localStorage.removeItem("token")
							dispatch(logOutAction())
						}} className="navbar-profile-dropdown-item">Logout</li>
						</ul>
				 	}
			  	</li>
			</ul>
		</div>
	</nav>
	);
}

export default NavBar