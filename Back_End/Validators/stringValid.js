/**
 * Function to make the first letter of Fn and Ln Upper Case
 * @username: user name
 *
 * Return: (User Name)
 */

const nameUpperCase = (userName) => {
	let uppered = []
	let result = "";

	uppered = userName.split(' ')
	uppered.forEach((ele, i) => {
		ele = ele[0].toUpperCase() + ele.slice(1)
		result += ele
		if (i < uppered.length - 1)
			result += ' '
	});
	return (result)
}

/**
 * Function to Make Sure About the type of the message
 */

const messTypeValidator = (type, message) => {
	if (type !== "text" && type !== "media")
		return ({
			message: "Type Is Not Exist",
			succes: false
		})

	if (type === "text" && !message)
		return ({
			message: "Message is not Defined withv type Text",
			succes: false
		})

	if (type === "media" && !message)
		return ({
			message: "Message is not Defined withv type Media",
			succes: false
		})
	
	return ({
		succes: true
	})
}

export {nameUpperCase, messTypeValidator}