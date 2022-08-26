import {handleAppError, handleNetworkError} from '../common/utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {isLoggedIn} from '../features/Login/authReducer';
import {authAPI} from '../api/authAPI';
import {ResultCode} from '../common/enums/resultCode';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// initial state
const initialState = {
	status: 'loading' as RequestStatusType,
	error: null as null | string,
	isInitialized: false
}

export const initializeApp = createAsyncThunk('app/initializeApp',
	async (arg, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		try {
			const res = await authAPI.me()
			if(res.data.resultCode === ResultCode.success) {
				thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
				thunkAPI.dispatch(isLoggedIn({isLoggedIn: true}))
			}else {
				handleAppError(thunkAPI.dispatch, res.data)

			}
		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
		}
	}
)


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
	},
	extraReducers: (builder) => {
		builder.addCase(initializeApp.fulfilled, (state, action) => {
			state.isInitialized = true
		});
	}
})

//reducer
export const appReducer = slice.reducer

export const {setAppStatus, setAppError} = slice.actions

