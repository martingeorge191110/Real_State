import { isEmailValid } from "./emailValidator.js" 
/**
 * Function to checking the validation of user information Sign Up
 *
 * Return: (Error object)
 * otherwise - null
 */

const signUpValidator = (username, useremail, national, password) => {
	/* Check for email validation */
	if (!isEmailValid(useremail))	{
		const errorHand = new Error ("User Email Is Not Valid");
		errorHand.statusCode = 400;
		return (errorHand)
	}
	/* Check for user name validation */
	if (!username || username === "") {
		const errorHand = new Error ("User name Is Not Valid");
		errorHand.statusCode = 400;
		return (errorHand)
	}
	/* Check for user password validation */
	if (!password || password === "") {
		const errorHand = new Error ("User Password Is Not Valid");
		errorHand.statusCode = 400;
		return (errorHand)
	}
	/* Check for user national validation */
	if (!national || national === "") {
		const errorHand = new Error ("User Password Is Not Valid");
		errorHand.statusCode = 400;
		return (errorHand)
	}

	return (null)
}

/**
 * Function to checking the validation of user information Sign Up
 *
 * Retrun: (Error Object)
 * otherwise - (null)
 */

const signInValidator = (useremail, password) => {
	if (!isEmailValid(useremail))
	{
		const newError = new Error ("User Email Is Not Valid");
		newError.statusCode = 400;
		return (newError)
	}
	if (!password || password === "") {
		const newError = new Error ("User Password Is Not Valid");
		newError.statusCode = 400;
		return (newError)
	}

	return (null)
}

export {signUpValidator, signInValidator}
