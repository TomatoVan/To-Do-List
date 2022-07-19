import {todolistsAPI, TodolistType} from "../components/api/TodolistsApi";
import {AppThunk} from "./store";

//types
export type RemoveTodolistACType = ReturnType<typeof RemoveTodolist>
export type AddTodolistAcType = ReturnType<typeof AddTodolist>
export type ChangeTitleAcType = ReturnType<typeof ChangeTitle>
export type ChangeFilterAcType = ReturnType<typeof ChangeFilter>
export type SetTodolistAcType = ReturnType<typeof SetTodolist>

export type TodolistsActionsType = RemoveTodolistACType | AddTodolistAcType | ChangeTitleAcType | ChangeFilterAcType | SetTodolistAcType

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
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
			let newState = [...state]
			return newState.filter(tl => tl.id !== action.payload.id)
		}
		case "ADD-TODOLIST": {
			return [
				{id: action.payload.todolistId, title: action.payload.title, filter: 'all', addedDate: '', order: 0 },
				...state
			]
		}
		case "CHANGE-TODOLIST-TITLE": {
			let newState = [...state]
			return newState.map(tl => tl.id === action.payload.id ? {...tl, title:action.payload.title} : tl)
		}
		case "CHANGE-TODOLIST-FILTER": {
			let newState = [...state]
			return newState.map(t => t.id === action.payload.id ? {...t, filter: action.payload.filter} : t)
		}
		case "SET-TODOLIST":{
			return action.payload.todolists.map(tl => ({...tl, filter: "all" as FilterValuesType}))
		}
		default : return state
	}
}

//AC
export const RemoveTodolist = (id:string) => ({type: "REMOVE-TODOLIST", payload: {id}} as const)
export const AddTodolist = (title:string, todolistId: string) => ({type: "ADD-TODOLIST", payload:{title, todolistId}} as const)
export const ChangeTitle = (id:string, title:string) => ({type: "CHANGE-TODOLIST-TITLE", payload:{id, title}} as const)
export const ChangeFilter = (id:string, filter:FilterValuesType) => ({type: "CHANGE-TODOLIST-FILTER", payload:{id, filter}} as const)
export const SetTodolist = (todolists: TodolistType[]) => ({type: "SET-TODOLIST", payload:{todolists}} as const)

//TC
export const setTodolistsTC = (): AppThunk => (dispatch) => {
		todolistsAPI.getTodolists()
			.then(res => {
				console.log('get todo', res)
				dispatch(SetTodolist(res.data))
			})
		}


export const createTodolistTC = (title: string): AppThunk  => (dispatch) => {
		todolistsAPI.createTodolist(title)
			.then(res => {
				console.log('post todo', res)
				dispatch(AddTodolist(title, res.data.data.item.id))
			})
		}

export const deleteTodolistTC = (todolistId: string): AppThunk  => (dispatch) => {
	todolistsAPI.deleteTodolist(todolistId)
		.then(res => {
			console.log('delete todo', res)
			dispatch(RemoveTodolist(todolistId))
		})
}

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk  => (dispatch) => {
	todolistsAPI.updateTodolistTitle(todolistId, title)
		.then(res => {
			console.log('update todo', res)
			dispatch(ChangeTitle(todolistId, title))
		})
}
