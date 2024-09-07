/**
 * 
 */

const sendGenCodeMail = async (e, useremail, setLoad, setMess) => {
	e.preventDefault()

	setLoad(true)
	try {
		const response = await fetch("http://localhost:8000/api/auth/mail-gen-code", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				useremail
			})
		})

		const resObj = await response.json()
		if (!response.ok)
			throw new Error(resObj.message || "Somthing went wrong, responsoe is not OK")
		
		setLoad(false)
		setMess(response.message)
		return (resObj)
	} catch (err) {
		return ({
			succes: false,
			message: new Error(err).message
		})
	}
}

/**
 * 
 */

const resetPassApi = async (e, setCodeCheck, jsonObj, loading) => {
	e.preventDefault()

	setCodeCheck(false)
	loading(true)
	try {
		const response = await fetch("http://localhost:8000/api/auth/resetPass", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				...jsonObj
			})
		})

		const resObj = await response.json()
		if (!response.ok)
			throw new Error(resObj.message || "Somthing went wrong, responsoe is not OK")
		
		loading(false)
		return (resObj)
	} catch (err) {
		return ({
			succes: false,
			message: new Error(err).message
		})
	}
}

export {sendGenCodeMail, resetPassApi}