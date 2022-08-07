import {setAppStatus} from "../../app/appReducer";
import {authAPI, LoginParamsType, ResultCode} from "../../api/TodolistsApi";
import {handleAppError, handleNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

//initial State
const initialState = {
	isLoggedIn: false
}

export const loginTC = createAsyncThunk('auth/login',
	async (data: LoginParamsType, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		try {
			const res = await authAPI.login(data)
			if(res.data.resultCode === ResultCode.success) {
				thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
				console.log('delete task', res)
				return
			}else {
 				handleAppError(thunkAPI.dispatch, res.data)
 			}
		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
		}

	}
)

export const logout = createAsyncThunk('auth/logout',
	async (arg, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		try {
			const res = await authAPI.logout()
			if(res.data.resultCode === ResultCode.success) {
				thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
				console.log('logout data', res)
				return
			}else {
				handleAppError(thunkAPI.dispatch, res.data)
			}
		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
		}

	}
)

const slice = createSlice({
	//name of main reducer
	name: 'auth',
	initialState: initialState,
	reducers : {
		//AC becomes small reducers
		login(state, action: PayloadAction<{isLoggedIn: boolean}>) {
			state.isLoggedIn = action.payload.isLoggedIn
		}
	},
	extraReducers: (builder) => {
		builder.addCase(loginTC.fulfilled, (state, action) => {
				state.isLoggedIn = true
		});
		builder.addCase(logout.fulfilled, (state, action) => {
				state.isLoggedIn = false
		});
	}
})

//reducer
export const authReducer = slice.reducer
export const {login} = slice.actions








