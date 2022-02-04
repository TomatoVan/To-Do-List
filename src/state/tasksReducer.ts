import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistAcType, removeTodolistACType} from "./todolistsReducer";

export type removeTaskACType = ReturnType<typeof RemoveTaskAC>
export type addTaskACACType = ReturnType<typeof AddTaskAC>
export type changeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>
export type changeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>

export const RemoveTaskAC = (todolistId:string, id:string) => ({type: "REMOVE-TASK" , payload:{todolistId, id}} as const)
export const AddTaskAC = (todolistId:string, title:string) => ({type: "ADD-TASK" , payload:{todolistId,title}} as const)
export const ChangeTaskStatusAC = (todolistId:string, checked:boolean, id:string) => ({type: "CHANGE-TASK-STATUS" , payload:{todolistId,checked, id}} as const)
export const ChangeTaskTitleAC = (todolistId:string, title:string, id:string) => ({type: "CHANGE-TASK-TITLE" , payload:{todolistId,title, id}} as const)

type GeneralType = removeTaskACType | addTaskACACType |changeTaskStatusACType | changeTaskTitleACType | addTodolistAcType | removeTodolistACType

export const tasksReducer = (state:TasksStateType, action:GeneralType) : TasksStateType => {
	switch (action.type) {
		case "ADD-TODOLIST": {
			return {...state, [action.payload.todolistId] : [] }
		}
		case "REMOVE-TODOLIST" : {
			let newState = {...state}
			delete newState[action.payload.id]
			return newState
		}
		case "REMOVE-TASK": {
			return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(f => f.id !== action.payload.id)}
		}
		case "ADD-TASK": {
			let newTask = { id: v1(), title: action.payload.title, isDone: false }
			return {...state, [action.payload.todolistId] : [newTask, ...state[action.payload.todolistId]]}
		}
		case "CHANGE-TASK-STATUS": {
			return {...state, [action.payload.todolistId] : state[action.payload.todolistId].map(t => t.id === action.payload.id ? {...t, isDone:action.payload.checked} : t)}
		}
		case "CHANGE-TASK-TITLE": {
			return {...state, [action.payload.todolistId] : state[action.payload.todolistId].map(t => t.id === action.payload.id ? {...t, title:action.payload.title} : t)}
		}
		default : return state

	}
}

