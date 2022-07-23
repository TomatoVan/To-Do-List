import {ResultCode, todolistsAPI, TodolistType} from "../../api/TodolistsApi";
import {AppThunk} from "../../app/store";
import {RequestStatusType, setAppStatus} from "../../app/appReducer";
import {AxiosError} from "axios";
import {handleAppError, handleNetworkError} from "../../utils/error-utils";

//types
export type RemoveTodolistACType = ReturnType<typeof removeTodolist>
export type AddTodolistACType = ReturnType<typeof addTodolist>
export type ChangeTitleACType = ReturnType<typeof changeTodolistTitle>
export type ChangeFilterACType = ReturnType<typeof changeTodolistFilter>
export type SetTodolistACType = ReturnType<typeof setTodolist>
export type ChangeEntityStatusType = ReturnType<typeof changeTodolistEntityStatus>

export type TodolistsActionsType = RemoveTodolistACType | AddTodolistACType | ChangeTitleACType | ChangeFilterACType | SetTodolistACType | ChangeEntityStatusType

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

//reducer
export const todolistsReducer = (state:Array<TodolistDomainType> = initialState, action:TodolistsActionsType) : Array<TodolistDomainType> => {
	switch (action.type) {
		case "REMOVE-TODOLIST": {
			return state.filter(tl => tl.id !== action.payload.id)
		}
		case "ADD-TODOLIST": {
			return [
				{id: action.payload.todolistId, title: action.payload.title, filter: 'all', addedDate: '', order: 0, entityStatus: "idle" },
				...state
			]
		}
		case "CHANGE-TODOLIST-TITLE": {
			return state.map(tl => tl.id === action.payload.id ? {...tl, title:action.payload.title} : tl)
		}
		case "CHANGE-TODOLIST-FILTER": {
			return state.map(t => t.id === action.payload.id ? {...t, filter: action.payload.filter} : t)
		}
		case "SET-TODOLIST":{
			return action.payload.todolists.map(tl => ({...tl, filter: "all" as FilterValuesType, entityStatus: "idle"}))
		}
		case "CHANGE-TODOLIST-ENTITY-STATUS": {
			return state.map(tl => tl.id === action.payload.id ? ({...tl, entityStatus: action.payload.status}) : tl)
		}
		default : return state
	}
}

//AC
export const removeTodolist = (id:string) => ({type: "REMOVE-TODOLIST", payload: {id}} as const)
export const addTodolist = (title:string, todolistId: string) => ({type: "ADD-TODOLIST", payload:{title, todolistId}} as const)
export const changeTodolistTitle = (id:string, title:string) => ({type: "CHANGE-TODOLIST-TITLE", payload:{id, title}} as const)
export const changeTodolistFilter = (id:string, filter:FilterValuesType) => ({type: "CHANGE-TODOLIST-FILTER", payload:{id, filter}} as const)
export const setTodolist = (todolists: TodolistType[]) => ({type: "SET-TODOLIST", payload:{todolists}} as const)
export const changeTodolistEntityStatus  = (id: string, status: RequestStatusType) => ({type: "CHANGE-TODOLIST-ENTITY-STATUS", payload:{id, status}} as const)

//TC
export const setTodolistsTC = (): AppThunk => (dispatch) => {
	dispatch(setAppStatus('loading'))
		todolistsAPI.getTodolists()
			.then(res => {
				console.log('get todo', res)
				dispatch(setTodolist(res.data))
				dispatch(setAppStatus('succeeded'))
			})
			.catch((err: AxiosError) => {
				handleNetworkError(dispatch, err.message)
			})
		}


export const createTodolistTC = (title: string): AppThunk  => (dispatch) => {
	dispatch(setAppStatus('loading'))
		todolistsAPI.createTodolist(title)
			.then(res => {
				if(res.data.resultCode === ResultCode.success) {
					console.log('post todo', res)
					dispatch(addTodolist(title, res.data.data.item.id))
					dispatch(setAppStatus('succeeded'))
				} else {
					handleAppError(dispatch, res.data)
				}

			})
			.catch((err: AxiosError) => {
				handleNetworkError(dispatch, err.message)
			})
		}

export const deleteTodolistTC = (todolistId: string): AppThunk  => (dispatch) => {
	dispatch(setAppStatus('loading'))
	dispatch(changeTodolistEntityStatus(todolistId, 'loading'))
	todolistsAPI.deleteTodolist(todolistId)
		.then(res => {
			if(res.data.resultCode === ResultCode.success) {
				console.log('delete todo', res)
				dispatch(removeTodolist(todolistId))
				dispatch(setAppStatus('succeeded'))
			} else {
				handleAppError(dispatch, res.data)
			}
		})
		.catch((err: AxiosError) => {
			handleNetworkError(dispatch, err.message)
		})
}

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk  => (dispatch) => {
	dispatch(setAppStatus('loading'))
	todolistsAPI.updateTodolistTitle(todolistId, title)
		.then(res => {
			if(res.data.resultCode === ResultCode.success) {
				console.log('update todo', res)
				dispatch(changeTodolistTitle(todolistId, title))
				dispatch(setAppStatus('succeeded'))
			} else {
				handleAppError(dispatch, res.data)
			}

		})
		.catch((err: AxiosError) => {
			handleNetworkError(dispatch, err.message)
		})
}
