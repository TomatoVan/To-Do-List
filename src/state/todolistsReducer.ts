import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {todolistsAPI, TodolistType} from "../components/api/TodolistsApi";

export type removeTodolistACType = ReturnType<typeof RemoveTodolist>
export type addTodolistAcType = ReturnType<typeof AddTodolist>
export type changeTitleAcType = ReturnType<typeof ChangeTitle>
export type changeFilterAcType = ReturnType<typeof ChangeFilter>
export type SetTodolistAcType = ReturnType<typeof SetTodolist>

type GeneralTypeForAC = removeTodolistACType | addTodolistAcType | changeTitleAcType | changeFilterAcType | SetTodolistAcType

export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
}

export let todolistID1 = v1();
export let todolistID2 = v1();

const initialState:Array<TodolistDomainType> = [
	// {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
	// {id: todolistID2, title: 'What to buy', filter: 'all', , addedDate: '', order: 0},
]

export const todolistsReducer = (state:Array<TodolistDomainType> = initialState, action:GeneralTypeForAC) : Array<TodolistDomainType> => {
	switch (action.type) {
		case "REMOVE-TODOLIST": {
			let newState = [...state]
			return newState.filter(tl => tl.id !== action.payload.id)
		}
		case "ADD-TODOLIST": {
			return [
				...state,
				{id: action.payload.todolistId, title: action.payload.title, filter: 'all', addedDate: '', order: 0}
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
			return action.payload.todolists.map(tl => ({
				...tl,
				filter: "all" as FilterValuesType
			}))
		}
		default : return state
	}
}

export const RemoveTodolist = (id:string) => ({type: "REMOVE-TODOLIST", payload: {id}} as const)
export const AddTodolist = (title:string) => ({type: "ADD-TODOLIST", payload:{title, todolistId:v1()}} as const)
export const ChangeTitle = (id:string, title:string) => ({type: "CHANGE-TODOLIST-TITLE", payload:{id, title}} as const)
export const ChangeFilter = (id:string, filter:FilterValuesType) => ({type: "CHANGE-TODOLIST-FILTER", payload:{id, filter}} as const)
export const SetTodolist = (todolists: TodolistType[]) => ({type: "SET-TODOLIST", payload:{todolists}} as const)

export const setTodolistsThunk = () => {
	return (dispatch: Dispatch) => {
		todolistsAPI.getTodolists()
			.then(res => {
				dispatch(SetTodolist(res.data))
			})
	}
}
