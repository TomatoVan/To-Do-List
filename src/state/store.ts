import {applyMiddleware, combineReducers} from "redux";
import {TodolistsActionsType, todolistsReducer} from "../components/Todolists/todolistsReducer"
import {TaskActionsType, tasksReducer} from "../components/Tasks/tasksReducer"
import { legacy_createStore as createStore} from 'redux'
import thunk, {ThunkAction} from 'redux-thunk'
import {appReducer} from "../components/app/app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
	todolists:todolistsReducer,
	tasks:tasksReducer,
	app: appReducer
})
//state typification
export type AppRootStateType = ReturnType<typeof rootReducer>
//all reducers types
export type AppActionsType = TaskActionsType | TodolistsActionsType
//TC typification
export type AppThunk<ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, AppActionsType>
//useSelector for every typification
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const store = createStore(rootReducer, applyMiddleware(thunk)/*, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/)

// @ts-ignore
window.store = store