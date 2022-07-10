import {TasksStateType} from "../App";
import {addTodolistAcType, removeTodolistACType, SetTodolist, SetTodolistAcType} from "./todolistsReducer";
import {Dispatch} from "redux";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../components/api/TodolistsApi";
import {AppRootStateType} from "./store";

export type removeTaskACType = ReturnType<typeof RemoveTask>
export type addTaskACACType = ReturnType<typeof AddTask>
export type changeTaskStatusACType = ReturnType<typeof ChangeTaskStatus>
export type changeTaskTitleACType = ReturnType<typeof ChangeTaskTitle>
export type setTasksACType = ReturnType<typeof SetTasks>

type GeneralType = removeTaskACType | addTaskACACType |changeTaskStatusACType | changeTaskTitleACType
	| addTodolistAcType | removeTodolistACType | SetTodolistAcType | setTasksACType



const initialState:TasksStateType = {
	/*[todolistID1]: [
		{id: v1(), title: "HTML&CSS", status: true},
		{id: v1(), title: "JS", status: true},
		{id: v1(), title: "ReactJS", status: false},
		{id: v1(), title: "Rest API", status: false},
		{id: v1(), title: "GraphQL", status: false},
	],
	[todolistID2]: [
		{id: v1(), title: "HTML&CSS2", status: true},
		{id: v1(), title: "JS2", status: true},
		{id: v1(), title: "ReactJS2", status: false},
		{id: v1(), title: "Rest API2", status: false},
		{id: v1(), title: "GraphQL2", status: false},
	]*/
}


export const tasksReducer = (state: TasksStateType = initialState, action:GeneralType) : TasksStateType => {
	switch (action.type) {
		case "ADD-TODOLIST": {
			return {...state, [action.payload.todolistId] : [] }
		}
		case "REMOVE-TODOLIST": {
			let newState = {...state}
			delete newState[action.payload.id]
			return newState
		}
		case "REMOVE-TASK": {
			return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(f => f.id !== action.payload.id)}
		}
		case "ADD-TASK": {
			return {...state, [action.payload.task.todoListId] : [action.payload.task, ...state[action.payload.task.todoListId]]}
		}
		case "CHANGE-TASK-STATUS": {
			return {...state, [action.payload.todolistId] : state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, status:action.payload.status} : t)}
		}
		case "CHANGE-TASK-TITLE": {
			return {...state, [action.payload.todolistId] : state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, title:action.payload.title} : t)}
		}
		case "SET-TODOLIST": {
			let stateCopy = {...state}
			action.payload.todolists.forEach((tl) => {
				stateCopy[tl.id] = []
			})
			return stateCopy
		}
		case "SET-TASKS": {
			return {...state, [action.payload.todolistId]: action.payload.tasks}

		}
		default : return state

	}
}

export const RemoveTask = (todolistId:string, id:string) => ({type: "REMOVE-TASK" , payload:{todolistId, id}} as const)
export const AddTask = (task: TaskType) => ({type: "ADD-TASK" , payload:{task}} as const)
export const ChangeTaskStatus = (todolistId:string, status:TaskStatuses, taskId:string) => ({type: "CHANGE-TASK-STATUS" , payload:{todolistId,status, taskId}} as const)
export const ChangeTaskTitle = (todolistId:string,taskId:string, title:string ) => ({type: "CHANGE-TASK-TITLE" , payload:{todolistId,title, taskId}} as const)
export const SetTasks = (todolistId:string, tasks: TaskType[]) => ({type:"SET-TASKS", payload: {todolistId, tasks}} as const)

export const fetchTasksTC = (todolistId:string) => (dispatch: Dispatch) => {
		tasksAPI.getTasks(todolistId)
			.then(res => {
				console.log('get task', res)
				dispatch(SetTasks(todolistId, res.data.items))
			})
	}


export const createTaskTC = (todolistId:string, title: string) => (dispatch: Dispatch) => {
		tasksAPI.postTasks(todolistId, title)
			.then(res => {
				console.log('post task', res)
				let task = res.data.data.item
				dispatch(AddTask(task))
			})
	}


export const deleteTaskTC = (todolistId:string, taskId: string) => (dispatch: Dispatch) => {
		tasksAPI.deleteTask(todolistId, taskId)
			.then(res => {
				console.log('delete task', res)
				dispatch(RemoveTask(todolistId, taskId))
			})
	}
//спросить про ошибки в update

export const updateTaskStatusTC = (todolistId:string, taskId: string, status:TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
		const state = getState()

		const task = state.tasks[todolistId].find((elem)=> elem.id === taskId)
		if (task) {
			const model:UpdateTaskModelType = {
				title: task.title,
				startDate: task.startDate,
				priority: task.priority,
				description: task.description,
				deadline: task.deadline,
				status: status
			}

			tasksAPI.updateTasks(todolistId, taskId, model)
				.then(res => {
					console.log('update task', res)
					dispatch(ChangeTaskStatus(todolistId, status, taskId))
				})
		}
}

export const updateTaskTitleTC = (todolistId:string, taskId: string, title:string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
	const state = getState()

	const task = state.tasks[todolistId].find((elem)=> elem.id === taskId)
	if (task) {
		const model:UpdateTaskModelType = {
			title: title,
			startDate: task.startDate,
			priority: task.priority,
			description: task.description,
			deadline: task.deadline,
			status: task.status
		}

		tasksAPI.updateTasks(todolistId, taskId, model)
			.then(res => {
				console.log('update task', res)
				dispatch(ChangeTaskTitle(todolistId, taskId, title))
			})
	}
}


