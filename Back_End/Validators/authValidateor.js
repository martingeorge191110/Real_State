import { isEmailValid } from "./emailValidator.js" 
/**
 * Function to checking the validation of user information Sign Up
 *
 * Return: (boolean Value)
 */

const signUpValidator = (username, useremail, national, password) => {
	/* Check for email validation */
	if (!isEmailValid(useremail))	{
		const errorHand = new Error ("User Email Is Not Valid");
		errorHand.statusCode = 400;
		return (false)
	}
	/* Check for user name validation */
	if (!username || username === "") {
		const errorHand = new Error ("User name Is Not Valid");
		errorHand.statusCode = 400;
		return (false)
	}
	/* Check for user password validation */
	if (!password || password === "") {
		const errorHand = new Error ("User Password Is Not Valid");
		errorHand.statusCode = 400;
		return (false)
	}
	/* Check for user national validation */
	if (!national || national === "") {
		const errorHand = new Error ("User Password Is Not Valid");
		errorHand.statusCode = 400;
		return (false)
	}

	return (true)
}

/**
 * Function to checking the validation of user information Sign Up
 *
 * Retrun: (boolean Value)
 */

const signInValidator = (useremail, password) => {
	if (!isEmailValid(useremail))
	{
		const newError = new Error ("User Email Is Not Valid");
		newError.statusCode = 400;
		return (false)
	}
	if (!password || password === "") {
		const newError = new Error ("User Email Is Not Valid");
		newError.statusCode = 400;
		return (false)
	}

	return (true)
}

export {signUpValidator, signInValidator}