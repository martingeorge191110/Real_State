import React from "react";


const Loading = ({ color }) => {


	return (
		<>
			<div className="d-flex justify-content-center align-items-center background-color-white" >
				<div className = {`spinner-border text-${color || "white"}`} role="status">

				</div>
		 	</div>
		</>
	)
}

export default Loading
