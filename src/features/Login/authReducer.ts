import {setAppStatus} from "../../app/appReducer";
import {AppThunk} from "../../app/store";
import {authAPI, LoginParamsType, ResultCode} from "../../api/TodolistsApi";
import {handleAppError, handleNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";

// types
type LoginACType = ReturnType<typeof login>
type setAppIsInitializedACType = ReturnType<typeof setAppIsInitialized>
export type AuthActionsType = LoginACType | setAppIsInitializedACType
type InitialStateType = typeof initialState

//initial State
const initialState = {
	isLoggedIn: false,
	isInitialized: false
}

//reducer
export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
	switch (action.type) {
		case 'login/SET-IS-LOGGED-IN':
			return {...state, isLoggedIn: action.payload.isLoggedIn}
		case "login/SET-IS-INITIALIZED":
			return {...state, isInitialized: action.payload.isInitialized}
		default:
			return state
	}
}
// AC
export const login = (isLoggedIn: boolean) => ({type: 'login/SET-IS-LOGGED-IN', payload: {isLoggedIn}} as const)
export const setAppIsInitialized = (isInitialized: boolean) => ({type: 'login/SET-IS-INITIALIZED', payload: {isInitialized}} as const)

// TC

export const initializeApp = (): AppThunk => (dispatch) => {
	dispatch(setAppStatus('loading'))
	authAPI.me()
		.then(res => {
			if(res.data.resultCode === ResultCode.success) {
				console.log('auth me data', res)
				dispatch(login(true))
				dispatch(setAppStatus('succeeded'))
			} else {
				handleAppError(dispatch, res.data)
			}
		})
		.catch((err: AxiosError) => {
			handleNetworkError(dispatch, err.message)
		})
		.finally(() => {
			dispatch(setAppIsInitialized(true))
		})
}

export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
	dispatch(setAppStatus('loading'))
	authAPI.login(data)
		.then(res => {
			if(res.data.resultCode === ResultCode.success) {
				console.log('login data', res)
				dispatch(login(true))
				dispatch(setAppStatus('succeeded'))
			} else {
				handleAppError(dispatch, res.data)
			}
		})
		.catch((err: AxiosError) => {
			handleNetworkError(dispatch, err.message)
		})
}

export const logout = (): AppThunk => (dispatch) => {
	dispatch(setAppStatus('loading'))
	authAPI.logout()
		.then(res => {
			if(res.data.resultCode === ResultCode.success) {
				console.log('logout data', res)
				dispatch(login(false))
				dispatch(setAppStatus('succeeded'))
			} else {
				handleAppError(dispatch, res.data)
			}
		})
		.catch((err: AxiosError) => {
			handleNetworkError(dispatch, err.message)
		})
}



