class AppState {
	constructor (token, searchProp) {
		this.token = token || null
		this.searchProp = searchProp || null
	}
}

const appStateStore = new AppState(
	localStorage.getItem("token") ? localStorage.getItem("token") : null,
	null
)

const AppReducer = (state = appStateStore, action) => {
	if (action.type === "SIGN_UP")
		return {...state, token: action.payload}
	if (action.type === "SIGN_IN")
		return {...state, token: action.payload}
	if (action.type === "PROP_SEARCH")
		return {...state, searchProp: action.payload}

	return state
}

export {AppReducer, appStateStore}
