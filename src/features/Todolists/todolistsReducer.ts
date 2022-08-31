import {RequestStatusType, setAppStatus} from "../../app/appReducer";
import {handleAppError, handleNetworkError} from '../../common/utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ResultCode} from '../../common/enums/resultCode';
import {todolistsAPI, TodolistType} from '../../api/todolistsAPI';
import {logout} from '../Login/authReducer';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType,
	entityStatus: RequestStatusType
}

// initial state
const initialState:Array<TodolistDomainType> = [
	// {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
	// {id: todolistID2, title: 'What to buy', filter: 'all', , addedDate: '', order: 0},
]

export const  setTodolists = createAsyncThunk('todolists/setTodolists',
	async (arg, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		try {
			const res = await todolistsAPI.getTodolists()
			thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
			return {todolists: res.data}
		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
			return thunkAPI.rejectWithValue({})
		}

	})

export const  createTodolist = createAsyncThunk('todolists/createTodolist',
	async (title: string, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		try {
			const res = await todolistsAPI.createTodolist(title)
			if(res.data.resultCode === ResultCode.success) {
				thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
				return {title, todolistId: res.data.data.item.id}
			} else {
				handleAppError(thunkAPI.dispatch, res.data)
				return thunkAPI.rejectWithValue({})
			}

		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
			return thunkAPI.rejectWithValue({})
		}

	})


export const  deleteTodolist = createAsyncThunk('todolists/deleteTodolist',
	async (todolistId: string, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		thunkAPI.dispatch(changeTodolistEntityStatus({todolistId, status:'loading'}))
		try {
			const res = await todolistsAPI.deleteTodolist(todolistId)
			if(res.data.resultCode === ResultCode.success) {
				thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
				return {todolistId}
			} else {
				handleAppError(thunkAPI.dispatch, res.data)
				return thunkAPI.rejectWithValue({})
			}

		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
			return thunkAPI.rejectWithValue({})
		}

	})


export const  updateTodolistTitle = createAsyncThunk('todolists/updateTodolistTitle',
	async (params: {todolistId: string, title: string}, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		try {
			const res = await todolistsAPI.updateTodolistTitle(params.todolistId, params.title)
			if(res.data.resultCode === ResultCode.success) {
				thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
				return {todolistId: params.todolistId, title: params.title}
			} else {
				handleAppError(thunkAPI.dispatch, res.data)
				return thunkAPI.rejectWithValue({})
			}

		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
			return thunkAPI.rejectWithValue({})
		}

	})


const slice = createSlice({
	name:'todolists',
	initialState: initialState,
	reducers: {
		changeTodolistFilter(state, action:PayloadAction<{todolistId:string, filter:FilterValuesType}>){
			const index = state.findIndex(tl => tl.id === action.payload.todolistId)
			state[index].filter = action.payload.filter
		},
		changeTodolistEntityStatus(state, action:PayloadAction<{todolistId: string, status: RequestStatusType}>){
			const index = state.findIndex(tl => tl.id === action.payload.todolistId)
			state[index].entityStatus = action.payload.status
		},
	},
	extraReducers: (builder) => {
		builder.addCase(updateTodolistTitle.fulfilled, (state, action) => {
			if (action.payload) {
				const index = state.findIndex(tl => tl.id === action.payload?.todolistId)
				state[index].title = action.payload.title
			}
		});
		builder.addCase(setTodolists.fulfilled, (state, action) => {
			if (action.payload) {
				return action.payload.todolists.map(tl => ({...tl, filter: "all" as FilterValuesType, entityStatus: "idle"}))
			}
		});
		builder.addCase(createTodolist.fulfilled, (state, action) => {
			if (action.payload) {
				state.unshift({id: action.payload.todolistId, title: action.payload.title, filter: 'all', addedDate: '', order: 0, entityStatus: "idle" })
			}
		});
		builder.addCase(deleteTodolist.fulfilled, (state, action) => {
			if (action.payload) {
				const index = state.findIndex(tl => tl.id === action.payload?.todolistId)
				state.splice(index, 1)
				return state
			}
		});
		builder.addCase(logout.fulfilled, (state, action) => {
			state = []
			return state
		});

  }
})

//reducer
export const todolistsReducer = slice.reducer

export const {     changeTodolistFilter,  changeTodolistEntityStatus} = slice.actions









