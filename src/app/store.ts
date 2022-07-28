import {combineReducers} from "redux";
import {todolistsReducer} from "../features/Todolists/todolistsReducer"
import {tasksReducer} from "../features/Tasks/tasksReducer"
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {appReducer} from "./appReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "../features/Login/authReducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	todolists:todolistsReducer,
	tasks:tasksReducer,
	app: appReducer,
	auth : authReducer
})

// export const store = createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})


//state typification
export type AppRootStateType = ReturnType<typeof rootReducer>
//all reducers types
// export type AllAppActionsType = TaskActionsType | TodolistsActionsType | AppActionsType | AuthActionsType
export type AllAppActionsType = any
//TC typification
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllAppActionsType>
//useSelector typification
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
//dispatch typification
export type ThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, AllAppActionsType>;
export const useAppDispatch = () => useDispatch<ThunkDispatchType>();

// @ts-ignore
window.store = store
// @ts-ignore
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()