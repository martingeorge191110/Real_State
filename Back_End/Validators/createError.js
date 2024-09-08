
/**
 * Function to create and return new error
 */

const createError = (message, statusCode) => {
   const newErr = new Error(message)
   newErr.statusCode = statusCode
   return (newErr)
}

export {createError}