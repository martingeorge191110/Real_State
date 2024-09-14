import User from "../Modules/User.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { isEmailValid } from "../Validators/emailValidator.js";
import { nameUpperCase } from "../Validators/stringValid.js";
import { authResponse, comparePass, createToken, findUser, hashingPassword } from "../Utils/authHelper.js";
import {sendMail, sendMailRestPass} from "../Utils/mailHelper.js";
import { signInValidator, signUpValidator } from "../Validators/authValidateor.js";
import { createError } from "../Validators/createError.js";

dotenv.config()

/**
 * Sign Up Controller which using User Model
 * This Sign Up controller just for users not for admins
 */

const singUp = async (req, res, next) => {
	const {username, useremail, national, password} = req.body
	
	const checkValidators = signUpValidator(username, useremail, national, password)
	if (checkValidators !== null)
		return (next(checkValidators))

	const userNameUpper = nameUpperCase(username)
	try {
		/* Checking user existing */
		const user = await findUser(useremail)
		if (user)
		{
			const newError = new Error("User Already Exist!");
			newError.statusCode = 409;
			return (next(newError))
		}
		/* hashing user password to encode it and send to data base */
		const hashPass = hashingPassword(password);
		/* Create new user to send into DB */
		const newUser = await User.create({
			username: userNameUpper,
			useremail: useremail,
			national: national,
			password: hashPass
		})
		/* Create e new Token for user Auth */
		const token = createToken(newUser.useremail, newUser._id);

		const mailChecks = await sendMail(useremail, username);

		return (authResponse(res, 200, token, mailChecks ? "Signed up and mail sent, Succesfully" : "Signed up, Succefully"))

	} catch (err) {
		const newErr = new Error("Something Went Wrong")
		return (next(newErr))
	}
}

/**
 * Sign In Controller which using User Model
 * This Controller powered for Admins and Users
 */

const signIn = async (req, res, next) => {
	const {useremail, password} = req.body

	/* Checking for body information validation */
	const checkValidators = signInValidator(useremail, password)
	if (checkValidators !== null)
		return (next(checkValidators))
	
	try {
		/* Find the user account at first with user email and handle error */
		const findUserAcc = await findUser(useremail);

		if (!findUserAcc)
		{
			const newError = new Error ("Email Address is not Found, Register Now");
			newError.statusCode = 404;
			return (next(newError));
		}

		/* if user email found, compare password with hashed password */
		if (!comparePass(password, findUserAcc.data.password)) {
			const newError = new Error ("Password is not correct");
			newError.statusCode = 409;
			return (next(newError));
		}
		/* if user email and password correct create token and return the response */
		const token = createToken(useremail, findUserAcc.data._id);
		/* Send Mail, Welcome to User */
		const mailChecks = await sendMail(useremail, findUserAcc.data.username)

		return (authResponse(res, 200, token, mailChecks ? "Signed in and Mail to the user sent Succesfully" : "Signed in, Succesfully without sent mails"));
	} catch (err) {
		const newErr = new Error("Something Went Wrong")
		return (next(newErr))
	}
}

/**
 * Send mail controller
 * with generated code to start reset password process 
 */

const sendGenCode = async (req, res, next) => {
	const {useremail} = req.body

	if (!isEmailValid(useremail))
	{
		const newError = new Error ("User Email Is Not Valid");
		newError.statusCode = 400;
		return (next(newError))
	}
	try {
		const findUserEmail = await User.findOne({
			useremail: useremail
		})

		/* Check whether user email exist or not */
		if (!findUserEmail) {
			const newError = new Error("Email not found, please Sign Up!")
			newError.statusCode = 404
			return (next(newError))
		}

		/* Create generated code, and also send mail with this code */
		const genCode = Number(String(Math.random()).slice(2,7))
		const checkMail = await sendMailRestPass(useremail, genCode)
		/* Check sending mail Succesfuly */
		if (!checkMail) {
			const newError = new Error("Something went wrong, Please try agian!")
			newError.statusCode = 500
			return (next(newError))
		}

		/* if everything is good response */
		return (res.status(200).json({
			succes: true,
			message: "Mail sent and code has been generated, Succesfuly!",
			email: useremail,
			code: genCode
		}))
	} catch (err) {
		const newErr = new Error("Something Went Wrong")
		return (next(newErr))
	}
}

/**
 * controller which is the end of reset password process
 * depend on front end about comparing the send code from the json object and one whcih send to user in mail 
 */

const resetPssword = async (req, res, next) => {
	const { password, useremail } = req.body;

	/* Check user information validation */
	const checkValidators = signInValidator(useremail, password)
	if (checkValidators !== null)
		return (next(checkValidators))

	const hashedPass = hashingPassword(password);
	try {
		const updateUserPass = await User.updateOne({
			useremail: useremail
		}, {
			password: hashedPass
		}, {
			runValidators: true
		})
		/* Checkng for existing and Upadating User Account */
		if (!updateUserPass) {
			const newErr = new Error("Cannot Update or find user account!")
			newErr.statusCode = 404
			return (next(newErr))
		}

		return (res.status(200).json({
			succes: true,
			message: "Passsword has been changed, Succesfuly!"
		}))
	} catch (error) {
		const newErr = new Error("Somthing went wrong");
		return (next(newErr))
	}
}

/**
 * Controller to check of token Validation each Time user open the website
 */

const authValidation = async (req, res, next) => {
	const {authorization} = req.headers
	const token = authorization.split(" ")[1]

	try {
		jwt.verify(token, process.env.JWT_SECRET, (err) => {
			if (err) {
				const newErr = createError("Token is not Valid!", 403)
				return (next(newErr))
			}
			return (authResponse(res, 200, token, "Token still Valid!"))
		})
	} catch (err) {
		const newErr = createError("Something Went Wrong!", 500)
		return (next(newErr))
	}
}

export {singUp, signIn, sendGenCode, resetPssword, authValidation}
