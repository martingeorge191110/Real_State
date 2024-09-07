import { createStore } from "redux"
import {AppReducer, appStateStore} from "./reducer"
import { composeWithDevTools } from 'redux-devtools-extension'



const store = createStore(AppReducer,appStateStore, composeWithDevTools())


export default store
