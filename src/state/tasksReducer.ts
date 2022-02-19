import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodolistAcType, removeTodolistACType} from "./todolistsReducer";

export type removeTaskACType = ReturnType<typeof RemoveTask>
export type addTaskACACType = ReturnType<typeof AddTask>
export type changeTaskStatusACType = ReturnType<typeof ChangeTaskStatus>
export type changeTaskTitleACType = ReturnType<typeof ChangeTaskTitle>

type GeneralType = removeTaskACType | addTaskACACType |changeTaskStatusACType | changeTaskTitleACType | addTodolistAcType | removeTodolistACType

const initialState:TasksStateType = {
	/*[todolistID1]: [
		{id: v1(), title: "HTML&CSS", isDone: true},
		{id: v1(), title: "JS", isDone: true},
		{id: v1(), title: "ReactJS", isDone: false},
		{id: v1(), title: "Rest API", isDone: false},
		{id: v1(), title: "GraphQL", isDone: false},
	],
	[todolistID2]: [
		{id: v1(), title: "HTML&CSS2", isDone: true},
		{id: v1(), title: "JS2", isDone: true},
		{id: v1(), title: "ReactJS2", isDone: false},
		{id: v1(), title: "Rest API2", isDone: false},
		{id: v1(), title: "GraphQL2", isDone: false},
	]*/
}

export const tasksReducer = (state:TasksStateType = initialState, action:GeneralType) : TasksStateType => {
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

export const RemoveTask = (todolistId:string, id:string) => ({type: "REMOVE-TASK" , payload:{todolistId, id}} as const)
export const AddTask = (todolistId:string, title:string) => ({type: "ADD-TASK" , payload:{todolistId,title}} as const)
export const ChangeTaskStatus = (todolistId:string, checked:boolean, id:string) => ({type: "CHANGE-TASK-STATUS" , payload:{todolistId,checked, id}} as const)
export const ChangeTaskTitle = (todolistId:string, title:string, id:string) => ({type: "CHANGE-TASK-TITLE" , payload:{todolistId,title, id}} as const)


