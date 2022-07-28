import {setAppStatus} from "../../app/appReducer";
import {AppThunk} from "../../app/store";
import {authAPI, LoginParamsType, ResultCode} from "../../api/TodolistsApi";
import {handleAppError, handleNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//initial State
const initialState = {
	isLoggedIn: false
}

const slice = createSlice({
	//name of main reducer
	name: 'auth',
	initialState: initialState,
	reducers : {
		//AC becomes small reducers
		login(state, action: PayloadAction<{isLoggedIn: boolean}>) {
			state.isLoggedIn = action.payload.isLoggedIn
		}
	}
})

//reducer
export const authReducer = slice.reducer
export const {login} = slice.actions

// TC

export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
	dispatch(setAppStatus({status: 'loading'}))
	authAPI.login(data)
		.then(res => {
			if(res.data.resultCode === ResultCode.success) {
				console.log('login data', res)
				dispatch(login({isLoggedIn: true}))
				dispatch(setAppStatus({status: 'succeeded'}))
			} else {
				handleAppError(dispatch, res.data)
			}
		})
		.catch((err: AxiosError) => {
			handleNetworkError(dispatch, err.message)
		})
}

export const logout = (): AppThunk => (dispatch) => {
	dispatch(setAppStatus({status: 'loading'}))
	authAPI.logout()
		.then(res => {
			if(res.data.resultCode === ResultCode.success) {
				console.log('logout data', res)
				dispatch(login({isLoggedIn: false}))
				dispatch(setAppStatus({status: 'succeeded'}))
			} else {
				handleAppError(dispatch, res.data)
			}
		})
		.catch((err: AxiosError) => {
			handleNetworkError(dispatch, err.message)
		})
}



