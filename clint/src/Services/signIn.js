
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

export {signInApi}