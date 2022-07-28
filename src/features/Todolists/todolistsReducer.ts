import {ResultCode, todolistsAPI, TodolistType} from "../../api/TodolistsApi";
import {AppThunk} from "../../app/store";
import {RequestStatusType, setAppStatus} from "../../app/appReducer";
import {AxiosError} from "axios";
import {handleAppError, handleNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
		changeTodolistTitle(state, action:PayloadAction<{todolistId:string, title:string}>){
			const index = state.findIndex(tl => tl.id === action.payload.todolistId)
			state[index].title = action.payload.title
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
	}
})

//reducer
export const todolistsReducer = slice.reducer

export const {removeTodolist, addTodolist, changeTodolistTitle, changeTodolistFilter, setTodolist, changeTodolistEntityStatus} = slice.actions

//TC
export const setTodolistsTC = (): AppThunk => (dispatch) => {
	dispatch(setAppStatus({status: 'loading'}))
		todolistsAPI.getTodolists()
			.then(res => {
				console.log('get todo', res)
				dispatch(setTodolist({todolists: res.data}))
				dispatch(setAppStatus({status: 'succeeded'}))
			})
			.catch((err: AxiosError) => {
				handleNetworkError(dispatch, err.message)
			})
		}


export const createTodolistTC = (title: string): AppThunk  => (dispatch) => {
	dispatch(setAppStatus({status: 'loading'}))
		todolistsAPI.createTodolist(title)
			.then(res => {
				if(res.data.resultCode === ResultCode.success) {
					console.log('post todo', res)
					dispatch(addTodolist({title, todolistId: res.data.data.item.id}))
					dispatch(setAppStatus({status: 'succeeded'}))
				} else {
					handleAppError(dispatch, res.data)
				}

			})
			.catch((err: AxiosError) => {
				handleNetworkError(dispatch, err.message)
			})
		}

export const deleteTodolistTC = (todolistId: string): AppThunk  => (dispatch) => {
	dispatch(setAppStatus({status: 'loading'}))
	dispatch(changeTodolistEntityStatus({todolistId, status:'loading'}))
	todolistsAPI.deleteTodolist(todolistId)
		.then(res => {
			if(res.data.resultCode === ResultCode.success) {
				console.log('delete todo', res)
				dispatch(removeTodolist({todolistId}))
				dispatch(setAppStatus({status: 'succeeded'}))
			} else {
				handleAppError(dispatch, res.data)
			}
		})
		.catch((err: AxiosError) => {
			handleNetworkError(dispatch, err.message)
		})
}

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk  => (dispatch) => {
	dispatch(setAppStatus({status: 'loading'}))
	todolistsAPI.updateTodolistTitle(todolistId, title)
		.then(res => {
			if(res.data.resultCode === ResultCode.success) {
				console.log('update todo', res)
				dispatch(changeTodolistTitle({todolistId, title}))
				dispatch(setAppStatus({status: 'succeeded'}))
			} else {
				handleAppError(dispatch, res.data)
			}

		})
		.catch((err: AxiosError) => {
			handleNetworkError(dispatch, err.message)
		})
}
