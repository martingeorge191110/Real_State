import User from "../Modules/User.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

/**
 * Utility Function to find the user
 * @email: user email
 * @password: user password
 *
 * Return: (condition) which is boolean value
 */

const findUser = async (email = null, id = null) => {
	let validator;
	let value;
	if (id)
	{
		validator = "_id"
		value = id
	}
	else
	{
		validator = "useremail"
		value = email
	}

	try{
		const user = await User.findOne({
			[validator]: value
		}).select("-password")

		return ({
			succes: true,
			data: user
		})
	} catch (error) {
		return ({
			succes: false,
			data: null
		});
	}
}

/**
 * Function to hashing user password
 * @password: user password
 *
 * Return: (hashed password)
 */

const hashingPassword = (password) => {
	const salt = bcrypt.genSaltSync(10);
	const hashed = bcrypt.hashSync(password, salt);

	return (hashed)
}

/**
 * Function to create e new user Token using user _id and email
 * @email
 * @id
 *
 * Return: Token
 */

const createToken = (useremail, _id) => {
	const token = jwt.sign({
		useremail: useremail,
		_id: _id
	}, process.env.JWT_SECRET, {
		expiresIn: process.env.EXP_TIME
	})

	return (token)
}

/**
 * Function to response with token
 * @res: response object
 * @status: status code
 *
 * Return: response with json file and status
 */

const authResponse = (res, statusCode, token, message) => {
	return (res.status(statusCode).json({
		succes: true,
		message: message,
		token: token
	}))
}

/**
 * Utility Function to compare the hashed password
 */
const comparePass = (inputPass, dbPass) => {
	let compare = false;

	if (bcrypt.compareSync(inputPass, dbPass))
		compare = true;

	return (compare);
}

export {findUser, hashingPassword, createToken, authResponse, comparePass}
