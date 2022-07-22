import {todolistsAPI, TodolistType} from "../../api/TodolistsApi";
import {AppThunk} from "../../components/app/store";
import {RequestStatusType, setAppError, setAppStatus} from "../../components/app/appReducer";

//types
export type RemoveTodolistACType = ReturnType<typeof RemoveTodolist>
export type AddTodolistACType = ReturnType<typeof AddTodolist>
export type ChangeTitleACType = ReturnType<typeof ChangeTodolistTitle>
export type ChangeFilterACType = ReturnType<typeof ChangeTodolistFilter>
export type SetTodolistACType = ReturnType<typeof SetTodolist>
export type ChangeEntityStatusType = ReturnType<typeof ChangeTodolistEntityStatus>

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
export const RemoveTodolist = (id:string) => ({type: "REMOVE-TODOLIST", payload: {id}} as const)
export const AddTodolist = (title:string, todolistId: string) => ({type: "ADD-TODOLIST", payload:{title, todolistId}} as const)
export const ChangeTodolistTitle = (id:string, title:string) => ({type: "CHANGE-TODOLIST-TITLE", payload:{id, title}} as const)
export const ChangeTodolistFilter = (id:string, filter:FilterValuesType) => ({type: "CHANGE-TODOLIST-FILTER", payload:{id, filter}} as const)
export const SetTodolist = (todolists: TodolistType[]) => ({type: "SET-TODOLIST", payload:{todolists}} as const)
export const ChangeTodolistEntityStatus  = (id: string, status: RequestStatusType) => ({type: "CHANGE-TODOLIST-ENTITY-STATUS", payload:{id, status}} as const)

//TC
export const setTodolistsTC = (): AppThunk => (dispatch) => {
	dispatch(setAppStatus('loading'))
		todolistsAPI.getTodolists()
			.then(res => {
				console.log('get todo', res)
				dispatch(SetTodolist(res.data))
				dispatch(setAppStatus('succeeded'))
			})
		}


export const createTodolistTC = (title: string): AppThunk  => (dispatch) => {
	dispatch(setAppStatus('loading'))
		todolistsAPI.createTodolist(title)
			.then(res => {
				if(res.data.resultCode === 0) {
					console.log('post todo', res)
					dispatch(AddTodolist(title, res.data.data.item.id))
					dispatch(setAppStatus('succeeded'))
				} else {
					dispatch(setAppError(res.data.messages[0]))
					dispatch(setAppStatus('failed'))
				}

			})
		}

export const deleteTodolistTC = (todolistId: string): AppThunk  => (dispatch) => {
	dispatch(setAppStatus('loading'))
	dispatch(ChangeTodolistEntityStatus(todolistId, 'loading'))
	todolistsAPI.deleteTodolist(todolistId)
		.then(res => {
			if(res.data.resultCode === 0) {
				console.log('delete todo', res)
				dispatch(RemoveTodolist(todolistId))
				dispatch(setAppStatus('succeeded'))
			} else {
				dispatch(setAppError(res.data.messages[0]))
				dispatch(setAppStatus('failed'))
			}
		})
}

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk  => (dispatch) => {
	dispatch(setAppStatus('loading'))
	todolistsAPI.updateTodolistTitle(todolistId, title)
		.then(res => {
			if(res.data.resultCode === 0) {
				console.log('update todo', res)
				dispatch(ChangeTodolistTitle(todolistId, title))
				dispatch(setAppStatus('succeeded'))
			} else {
				dispatch(setAppError(res.data.messages[0]))
				dispatch(setAppStatus('failed'))
			}

		})
}
