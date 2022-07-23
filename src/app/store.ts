import {applyMiddleware, combineReducers} from "redux";
import {TodolistsActionsType, todolistsReducer} from "../features/Todolists/todolistsReducer"
import {TaskActionsType, tasksReducer} from "../features/Tasks/tasksReducer"
import { legacy_createStore as createStore} from 'redux'
import thunk, {ThunkAction} from 'redux-thunk'
import {AppActionsType, appReducer} from "./appReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AuthActionsType, authReducer} from "../features/Login/authReducer";

const rootReducer = combineReducers({
	todolists:todolistsReducer,
	tasks:tasksReducer,
	app: appReducer,
	auth : authReducer
})
//state typification
export type AppRootStateType = ReturnType<typeof rootReducer>
//all reducers types
export type AllAppActionsType = TaskActionsType | TodolistsActionsType | AppActionsType | AuthActionsType
//TC typification
export type AppThunk<ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, AllAppActionsType>
//useSelector for every typification
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const store = createStore(rootReducer, applyMiddleware(thunk)/*, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/)

// @ts-ignore
window.store = store