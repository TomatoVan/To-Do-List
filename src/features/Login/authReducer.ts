import {setAppStatus} from "../../app/appReducer";
import {AppThunk} from "../../app/store";
import {authAPI, ResultCode, tasksAPI} from "../../api/TodolistsApi";
import {handleAppError, handleNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {addTask} from "../Tasks/tasksReducer";

// types
type LoginACType = ReturnType<typeof login>
export type AuthActionsType = LoginACType
type InitialStateType = typeof initialState

//initial State
const initialState = {
	isLoggedIn: false
}

//reducer
export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
	switch (action.type) {
		case 'login/SET-IS-LOGGED-IN':
			return {...state, isLoggedIn: action.payload.value}
		default:
			return state
	}
}
// AC
export const login = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', payload: {value}} as const)

// TC
export const loginTC = (data: any): AppThunk => (dispatch) => {
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

