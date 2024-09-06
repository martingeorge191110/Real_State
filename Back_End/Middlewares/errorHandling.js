/**
 * class for creating a new server error
 */

class ServerError {
	constructor (message, statusCode, errStack) {
		this.message = message
		this.statusCode = statusCode
		this.errStack = errStack
	}
}

/**
 * Function utility to return the whole error message
 */

const HandleError = (err, req, res, next) => {
	const newErr = new ServerError(err.message, err.statusCode || 500, err.stack);

	return (res.status(newErr.statusCode).json({
		success: false,
		message: newErr.message,
		error: process.env.NODE_ENV === 'production' ? null : newErr.errStack
	}));
}

export default HandleError
