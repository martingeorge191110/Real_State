
/**
 * Action Function to change token
 */

const signUpAction = (token) => {
	return {
		type: "SIGN_UP",
		payload: token
	}
}

export {signUpAction}
