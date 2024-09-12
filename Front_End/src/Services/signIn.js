
/**
 * Function to get api call for signning in
 *
 * Return: (response object or error message)
 */

const signInApi = async (bodyObject, setlOadingFunc) => {
	setlOadingFunc(true)

	try {
		const response = await fetch("http://localhost:8000/api/auth/sign-in", {
			method: "POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify({
				...bodyObject
			})
		})

		const resObj = await response.json()
		/* Check whether the response is OK or not */
		if (!response.ok)
			throw new Error(resObj.message || "Somthing went wrong, responsoe is not OK")

		return (resObj)
	} catch (err) {
		return ({
			succes: false,
			message: new Error(err).message
		})
	}
}

/**
 * Api Call to determine whether token is valid or not
 *
 * Return: json object holds the response
 */

const tokenValidApi = async (token, setLoading) => {
	try {
		const response = await fetch("http://localhost:8000/api/auth/sign-in", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${token}`
			}
		})
		
		const jsonObj = await response.json()
		
		setLoading(false)
		return (jsonObj)
	} catch (err) {
		setLoading(false)
		const error = new Error(err)
		console.log(error)
		return ({
			succes: false,
			message: error.message,
			name: error.name
		})
	}
}

export {signInApi, tokenValidApi}
