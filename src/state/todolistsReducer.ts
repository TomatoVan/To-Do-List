import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export type removeTodolistACType = ReturnType<typeof RemoveTodolist>
export type addTodolistAcType = ReturnType<typeof AddTodolist>
export type changeTitleAcType = ReturnType<typeof ChangeTitle>
export type changeFilterAcType = ReturnType<typeof ChangeFilter>

type GeneralTypeForAC = removeTodolistACType | addTodolistAcType | changeTitleAcType | changeFilterAcType



export let todolistID1 = v1();
export let todolistID2 = v1();

const initialState:Array<TodolistsType> = [
	// {id: todolistID1, title: 'What to learn', filter: 'all'},
	// {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state:Array<TodolistsType> = initialState, action:GeneralTypeForAC) : Array<TodolistsType> => {
	switch (action.type) {
		case "REMOVE-TODOLIST": {
			let newState = [...state]
			return newState.filter(tl => tl.id !== action.payload.id)
		}
		case "ADD-TODOLIST": {
			return [
				...state,
				{id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
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
		default : return state
	}
}

export const RemoveTodolist = (id:string) => ({type: "REMOVE-TODOLIST", payload: {id}} as const)
export const AddTodolist = (title:string) => ({type: "ADD-TODOLIST", payload:{title, todolistId:v1()}} as const)
export const ChangeTitle = (id:string, title:string) => ({type: "CHANGE-TODOLIST-TITLE", payload:{id, title}} as const)
export const ChangeFilter = (id:string, filter:FilterValuesType) => ({type: "CHANGE-TODOLIST-FILTER", payload:{id, filter}} as const)
