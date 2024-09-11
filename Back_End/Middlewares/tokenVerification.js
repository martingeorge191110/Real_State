import jwt from 'jsonwebtoken'
import { createError } from '../Validators/createError.js'



const verifyToken =  (req, res, next) => {
	const { authorization } = req.headers

	if (!authorization) {
		const error = createError("token must be included in Authorization headers", 404)
		return (res.status(error.statusCode).json({
			succes: false,
			message: error.message,
			stack: process.env.NODE_ENV === "development" ? error.stack : "Not Allowed for production"
		}))
	}

	const token = authorization.split(' ')[1]

	jwt.verify(token, process.env.JWT_SECRET, (err, tokenizedInf) => {
		if (err){
			const error = createError("Token is not Valid!", 403)
			return (res.status(error.statusCode).json({
				succes: false,
				message: error.message,
				stack: process.env.NODE_ENV === "development" ? error.stack : "Not Allowed for production"
			}))
		}
	
		req.userEmail = tokenizedInf.userEmail
		req._id = tokenizedInf._id

		next()
	})
}

export default verifyToken
