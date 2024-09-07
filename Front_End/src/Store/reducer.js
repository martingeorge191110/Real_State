class AppState {
	constructor (token) {
		this.token = token || null
	}
}

const appStateStore = new AppState(
	localStorage.getItem("token") ? localStorage.getItem("token") : null,
)

const AppReducer = (state = appStateStore, action) => {
	if (action.type === "SIGN_UP")
		return {...state, token: action.payload}
	if (action.type === "SIGN_IN")
		return {...state, token: action.payload}

	return state
}

export {AppReducer, appStateStore}
