
class AppState {
	constructor (token, searchProp, userInf, chatInfo) {
		this.token = token || null
		this.searchProp = searchProp || null
		this.staticUserInf = userInf || null
		this.chatInfo = chatInfo || null
	}
}

const appStateStore = new AppState(
	localStorage.getItem("token") ? localStorage.getItem("token") : null,
	null,
	null,
	null
)

const AppReducer = (state = appStateStore, action) => {
	if (action.type === "SIGN_UP")
		return {...state, token: action.payload}
	if (action.type === "SIGN_IN")
		return {...state, token: action.payload}
	if (action.type === "PROP_SEARCH")
		return {...state, searchProp: action.payload}
	if (action.type === "LOG_OUT")
		return {...state, token: action.payload}
	if (action.type === "USER_INF")
		return {...state, staticUserInf: action.payload}
	if (action.type === "CHAT_INF")
		return {...state, chatInf: action.payload}

	return state
}

export {AppReducer, appStateStore}
