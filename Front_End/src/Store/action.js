
/**
 * Action Function to change token
 */

const signUpAction = (token) => {
	return {
		type: "SIGN_UP",
		payload: token
	}
}

/**
 * Action Function to change token
 */

const signInAction = (token) => {
	return {
		type: "SIGN_IN",
		payload: token
	}
} 

export {signUpAction, signInAction}
