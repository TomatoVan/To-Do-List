import {ResultCode, todolistsAPI, TodolistType} from "../../api/TodolistsApi";
import {RequestStatusType, setAppStatus} from "../../app/appReducer";
import {handleNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

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

export const  setTodolistsTC = createAsyncThunk('todolists/setTodolists',
	async (arg, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		try {
			const res = await todolistsAPI.getTodolists()
			thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
			console.log('get todo', res)
			thunkAPI.dispatch(setTodolist({todolists: res.data}))
		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
		}

	})


// export const setTodolistsTC_ = (): AppThunk => (dispatch) => {
// 	dispatch(setAppStatus({status: 'loading'}))
// 	todolistsAPI.getTodolists()
// 		.then(res => {
// 			console.log('get todo', res)
// 			dispatch(setTodolist({todolists: res.data}))
// 			dispatch(setAppStatus({status: 'succeeded'}))
// 		})
// 		.catch((err: AxiosError) => {
// 			handleNetworkError(dispatch, err.message)
// 		})
// }

export const  createTodolistTC = createAsyncThunk('todolists/createTodolist',
	async (title: string, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		try {
			const res = await todolistsAPI.createTodolist(title)
			if(res.data.resultCode === ResultCode.success) {
				thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
				console.log('post todo', res)
				thunkAPI.dispatch(addTodolist({title, todolistId: res.data.data.item.id}))
			}

		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
		}

	})

// export const createTodolistTC_ = (title: string): AppThunk  => (dispatch) => {
// 	dispatch(setAppStatus({status: 'loading'}))
// 	todolistsAPI.createTodolist(title)
// 		.then(res => {
// 			if(res.data.resultCode === ResultCode.success) {
// 				console.log('post todo', res)
// 				dispatch(addTodolist({title, todolistId: res.data.data.item.id}))
// 				dispatch(setAppStatus({status: 'succeeded'}))
// 			} else {
// 				handleAppError(dispatch, res.data)
// 			}
//
// 		})
// 		.catch((err: AxiosError) => {
// 			handleNetworkError(dispatch, err.message)
// 		})
// }

export const  deleteTodolistTC = createAsyncThunk('todolists/deleteTodolist',
	async (todolistId: string, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		thunkAPI.dispatch(changeTodolistEntityStatus({todolistId, status:'loading'}))
		try {
			const res = await todolistsAPI.deleteTodolist(todolistId)
			if(res.data.resultCode === ResultCode.success) {
				thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
				console.log('delete todo', res)
				thunkAPI.dispatch(removeTodolist({todolistId}))
			}

		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
		}

	})

// export const deleteTodolistTC_ = (todolistId: string): AppThunk  => (dispatch) => {
// 	dispatch(setAppStatus({status: 'loading'}))
// 	dispatch(changeTodolistEntityStatus({todolistId, status:'loading'}))
// 	todolistsAPI.deleteTodolist(todolistId)
// 		.then(res => {
// 			if(res.data.resultCode === ResultCode.success) {
// 				console.log('delete todo', res)
// 				dispatch(removeTodolist({todolistId}))
// 				dispatch(setAppStatus({status: 'succeeded'}))
// 			} else {
// 				handleAppError(dispatch, res.data)
// 			}
// 		})
// 		.catch((err: AxiosError) => {
// 			handleNetworkError(dispatch, err.message)
// 		})
// }

export const  updateTodolistTitleTC = createAsyncThunk('todolists/updateTodolistTitle',
	async (params: {todolistId: string, title: string}, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		try {
			const res = await todolistsAPI.updateTodolistTitle(params.todolistId, params.title)
			if(res.data.resultCode === ResultCode.success) {
				thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
				console.log('update todo', res)
				return {todolistId: params.todolistId, title: params.title}
			}

		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
		}

	})

// export const updateTodolistTitleTC_ = (todolistId: string, title: string): AppThunk  => (dispatch) => {
// 	dispatch(setAppStatus({status: 'loading'}))
// 	todolistsAPI.updateTodolistTitle(todolistId, title)
// 		.then(res => {
// 			if(res.data.resultCode === ResultCode.success) {
// 				console.log('update todo', res)
// 				dispatch(changeTodolistTitle({todolistId, title}))
// 				dispatch(setAppStatus({status: 'succeeded'}))
// 			} else {
// 				handleAppError(dispatch, res.data)
// 			}
//
// 		})
// 		.catch((err: AxiosError) => {
// 			handleNetworkError(dispatch, err.message)
// 		})
// }

const slice = createSlice({
	name:'todolists',
	initialState: initialState,
	reducers: {
		removeTodolist(state, action:PayloadAction<{todolistId:string}>){
			const index = state.findIndex(tl => tl.id === action.payload.todolistId)
			state.splice(index, 1)
			return state
		},
		addTodolist(state, action:PayloadAction<{title:string, todolistId: string}>){
			state.unshift({id: action.payload.todolistId, title: action.payload.title, filter: 'all', addedDate: '', order: 0, entityStatus: "idle" })
		},
		changeTodolistFilter(state, action:PayloadAction<{todolistId:string, filter:FilterValuesType}>){
			const index = state.findIndex(tl => tl.id === action.payload.todolistId)
			state[index].filter = action.payload.filter
		},
		setTodolist(state, action:PayloadAction<{todolists: TodolistType[]}>){
			return action.payload.todolists.map(tl => ({...tl, filter: "all" as FilterValuesType, entityStatus: "idle"}))
		},
		changeTodolistEntityStatus(state, action:PayloadAction<{todolistId: string, status: RequestStatusType}>){
			const index = state.findIndex(tl => tl.id === action.payload.todolistId)
			state[index].entityStatus = action.payload.status
		},
	},
	extraReducers: (builder) => {
		builder.addCase(updateTodolistTitleTC.fulfilled, (state, action) => {
			if (action.payload) {
				const index = state.findIndex(tl => tl.id === action.payload?.todolistId)
				state[index].title = action.payload.title
			}
		});

  }
})

//reducer
export const todolistsReducer = slice.reducer

export const { addTodolist, removeTodolist, setTodolist,  changeTodolistFilter,  changeTodolistEntityStatus} = slice.actions

//TC








