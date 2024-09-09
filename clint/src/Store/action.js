class Action {
	constructor (type, payload) {
		this.type = type
		this.payload = payload
	}
}

/**
 * Action Function to change token
 */

const signUpAction = (token) => {
	const action = new Action("SIGN_UP", token)

	return ({
		...action
	})
}

/**
 * Action Function to change token
 */

const signInAction = (token) => {
	const action = new Action("SIGN_IN", token)

	return ({
		...action
	})
}

/**
 * Action Function to set new searching property object
 * {
 * 	location city,
 * 	min price,
 * 	max price
 * }
 */

const propSearchAction = (object) => {
	const action = new Action("PROP_SEARCH", object)

	return ({
		...action
	})
}

export {signUpAction, signInAction, propSearchAction}
