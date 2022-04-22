import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";


const rootReducer = combineReducers({
	todolists:todolistsReducer,
	tasks:tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

// @ts-ignore
export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// @ts-ignore
window.store = store