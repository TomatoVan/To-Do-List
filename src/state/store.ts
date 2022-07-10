import {applyMiddleware, combineReducers} from "redux";
import {todolistsReducer} from "./todolistsReducer"
import {tasksReducer} from "./tasksReducer"
import { legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
	todolists:todolistsReducer,
	tasks:tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
export const store = createStore(rootReducer, applyMiddleware(thunk)/*, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/)

// @ts-ignore
window.store = store