
/**
 * Api Call to get all searching properties
 *
 * Return: Json object holds array of the data
 */

const searchPropApi = async (city, minP, maxP, token, setLoading) => {
	try {
		/* Get response using query and token for authorization */
		const response = await fetch(
			`http://localhost:8000/api/property/search?city=${city}&minPrice=${minP}&maxPrice=${maxP}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"authorization": `Bearer ${token}`
				}
			}
		)

		const jsonObj = await response.json()
		if (!response.ok)
			return ({
				succes: jsonObj.succes,
				message: jsonObj.message,
				data: null
				})
		
		setLoading(false)
		return (jsonObj)
	} catch (err) {
		setLoading(false)
		const error = new Error(err)
		return ({
			succes: false,
			message: new Error(err).message,
			name: error.name
		})
	}
}

export { searchPropApi }
