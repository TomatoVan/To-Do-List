import {setAppStatus} from '../../app/appReducer';
import {handleAppError, handleNetworkError} from '../../common/utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {authAPI, LoginParamsType} from '../../api/authAPI';
import {FieldErrorType} from '../../api/ResponceTypes';
import {ResultCode} from '../../common/enums/resultCode';

//initial State
const initialState = {
	isLoggedIn: false
}

export const login = createAsyncThunk<undefined, LoginParamsType, {rejectValue: {errors: Array<string>, fieldsErrors?: Array<FieldErrorType>}}>('auth/login',
	async (data, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		try {
			const res = await authAPI.login(data)
			if(res.data.resultCode === ResultCode.success) {
				thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
				return
			}else {
 				handleAppError(thunkAPI.dispatch, res.data)
				return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors} )
 			}
		} catch (err: any) {
			const error: AxiosError = err
			handleNetworkError(thunkAPI.dispatch, err.message)
			return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
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
				return
			}else {
				handleAppError(thunkAPI.dispatch, res.data)
				return thunkAPI.rejectWithValue({})
			}
		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
			return thunkAPI.rejectWithValue({})
		}

	}
)

const slice = createSlice({
	//name of main reducer
	name: 'auth',
	initialState: initialState,
	reducers : {
		//AC becomes small reducers
		isLoggedIn(state, action: PayloadAction<{isLoggedIn: boolean}>) {
			state.isLoggedIn = action.payload.isLoggedIn
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
				state.isLoggedIn = true
		});
		builder.addCase(logout.fulfilled, (state, action) => {
				state.isLoggedIn = false
		});


	}
})

//reducer
export const authReducer = slice.reducer
export const {isLoggedIn} = slice.actions








