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
 * Log Out Action
 */
const logOutAction = () => {
	const action = new Action("LOG_OUT", null)

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

/**
 * Action to get user Infromation after oppening the application
 */

const staticUserInfAction = (useInfObj) => {
	const action = new Action("USER_INF", useInfObj)

	return ({
		...action
	})
}

/**
 * Action to store chat information (other users information and chat ids)
 */

const chatInfAction = (arrayOfChats) => {
	const action = new Action("CHAT_INF", arrayOfChats)

	return ({
		...action
	})
}



export {signUpAction, signInAction,
	propSearchAction, logOutAction,
	staticUserInfAction, chatInfAction}
