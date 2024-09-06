import validator from "validator"

/**
 * Validator function for cheking if the email is valid or not
 *
 * Return: true or false
 */

const isEmailValid = (email) => {
   let booleanVal = false;

   if (validator.isEmail(email))
      booleanVal = true

   return (booleanVal)
}

export {isEmailValid}
