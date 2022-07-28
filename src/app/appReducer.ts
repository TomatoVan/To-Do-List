import {AppThunk} from "./store";
import {authAPI, ResultCode} from "../api/TodolistsApi";
import {handleAppError, handleNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {login} from "../features/Login/authReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// initial state
const initialState = {
	status: 'loading' as RequestStatusType,
	error: null as null | string,
	isInitialized: false
}

const slice = createSlice({
	name: 'app',
	initialState: initialState,
	reducers: {
		setAppStatus(state, action: PayloadAction<{status: RequestStatusType}>) {
			state.status = action.payload.status
		},
		setAppError(state, action: PayloadAction<{error: null | string}>) {
			state.error = action.payload.error
		},
		setAppIsInitialized(state, action: PayloadAction<{isInitialized: boolean}>) {
			state.isInitialized = action.payload.isInitialized
		}
	}
})

//reducer
export const appReducer = slice.reducer

export const {setAppStatus, setAppError, setAppIsInitialized} = slice.actions

//TC

export const initializeApp = (): AppThunk => (dispatch) => {
	dispatch(setAppStatus({status: 'loading'}))
	authAPI.me()
		.then(res => {
			if(res.data.resultCode === ResultCode.success) {
				console.log('auth me data', res)
				dispatch(login({isLoggedIn: true}))
				dispatch(setAppStatus({status:'succeeded'}))
			} else {
				handleAppError(dispatch, res.data)
			}
		})
		.catch((err: AxiosError) => {
			handleNetworkError(dispatch, err.message)
		})
		.finally(() => {
			dispatch(setAppIsInitialized({isInitialized: true}))
		})
}