import {applyMiddleware, combineReducers} from "redux";
import {TodolistsActionsType, todolistsReducer} from "../components/Todolists/todolistsReducer"
import {TaskActionsType, tasksReducer} from "../components/Tasks/tasksReducer"
import { legacy_createStore as createStore} from 'redux'
import thunk, {ThunkAction} from 'redux-thunk'

const rootReducer = combineReducers({
	todolists:todolistsReducer,
	tasks:tasksReducer
})
//state typification
export type AppRootStateType = ReturnType<typeof rootReducer>
//all reducers types
export type AppActionsType = TaskActionsType | TodolistsActionsType
//TC typification
export type AppThunk<ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, AppActionsType>

export const store = createStore(rootReducer, applyMiddleware(thunk)/*, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/)

// @ts-ignore
window.store = store