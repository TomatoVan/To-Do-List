import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export type removeTodolistACType = ReturnType<typeof RemoveTodolistAC>
export type addTodolistAcType = ReturnType<typeof AddTodolistAC>
export type changeTitleAcType = ReturnType<typeof ChangeTitleAC>
export type changeFilterAcType = ReturnType<typeof ChangeFilterAC>

type GeneralTypeForAC = removeTodolistACType | addTodolistAcType | changeTitleAcType | changeFilterAcType


export const RemoveTodolistAC = (id:string) => ({type: "REMOVE-TODOLIST", payload: {id}} as const)
export const AddTodolistAC = (title:string) => ({type: "ADD-TODOLIST" , payload:{title, todolistId:v1()}} as const)
export const ChangeTitleAC = (id:string, title:string) => ({type: "CHANGE-TODOLIST-TITLE", payload:{id, title}} as const)
export const ChangeFilterAC = (id:string, filter:FilterValuesType) => ({type: "CHANGE-TODOLIST-FILTER", payload:{id, filter}} as const)

export const todolistsReducer = (state:Array<TodolistsType>, action:GeneralTypeForAC) : Array<TodolistsType> => {
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
