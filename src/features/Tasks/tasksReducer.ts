import {AddTodolistACType, RemoveTodolistACType, SetTodolistACType} from "../Todolists/todolistsReducer";
import {ResultCode, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/TodolistsApi";
import {AppThunk} from "../../app/store";
import {TasksStateType} from "../Todolists/TodolistsList";
import {setAppStatus} from "../../app/appReducer";
import {AxiosError} from "axios";
import {handleAppError, handleNetworkError} from "../../utils/error-utils";

//types
export type removeTaskACType = ReturnType<typeof removeTask>
export type addTaskACACType = ReturnType<typeof addTask>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatus>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitle>
export type setTasksACType = ReturnType<typeof setTasks>

export type TaskActionsType = removeTaskACType | addTaskACACType |changeTaskStatusACType | changeTaskTitleACType
	| AddTodolistACType | RemoveTodolistACType | SetTodolistACType | setTasksACType

// initial state
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

//reducer
export const tasksReducer = (state: TasksStateType = initialState, action:TaskActionsType) : TasksStateType => {
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

//AC
export const removeTask = (todolistId:string, id:string) => ({type: "REMOVE-TASK" , payload:{todolistId, id}} as const)
export const addTask = (task: TaskType) => ({type: "ADD-TASK" , payload:{task}} as const)
export const changeTaskStatus = (todolistId:string, status:TaskStatuses, taskId:string) => ({type: "CHANGE-TASK-STATUS" , payload:{todolistId,status, taskId}} as const)
export const changeTaskTitle = (todolistId:string, taskId:string, title:string ) => ({type: "CHANGE-TASK-TITLE" , payload:{todolistId,title, taskId}} as const)
export const setTasks = (todolistId:string, tasks: TaskType[]) => ({type:"SET-TASKS", payload: {todolistId, tasks}} as const)

//TC
export const fetchTasksTC = (todolistId:string): AppThunk => (dispatch) => {
	dispatch(setAppStatus('loading'))
	tasksAPI.getTasks(todolistId)
		.then(res => {
			console.log('get task', res)
			dispatch(setTasks(todolistId, res.data.items))
			dispatch(setAppStatus('succeeded'))
		})
		.catch((err: AxiosError) => {
			handleNetworkError(dispatch, err.message)
		})
	}


export const createTaskTC = (todolistId:string, title: string): AppThunk => (dispatch) => {
	dispatch(setAppStatus('loading'))
	tasksAPI.postTasks(todolistId, title)
		.then(res => {
			if(res.data.resultCode === ResultCode.success) {
				console.log('post task', res)
				let task = res.data.data.item
				dispatch(addTask(task))
				dispatch(setAppStatus('succeeded'))
			} else {
				handleAppError(dispatch, res.data)
			}

		})
		.catch((err: AxiosError) => {
			handleNetworkError(dispatch, err.message)
		})
	}


export const deleteTaskTC = (todolistId:string, taskId: string): AppThunk => (dispatch) => {
	dispatch(setAppStatus('loading'))
	tasksAPI.deleteTask(todolistId, taskId)
		.then(res => {
			if(res.data.resultCode === ResultCode.success) {
				console.log('delete task', res)
				dispatch(removeTask(todolistId, taskId))
				dispatch(setAppStatus('succeeded'))
			} else {
				handleAppError(dispatch, res.data)
			}

		})
		.catch((err: AxiosError) => {
			handleNetworkError(dispatch, err.message)
		})
	}


export const updateTaskStatusTC = (todolistId:string, taskId: string, status:TaskStatuses): AppThunk => (dispatch, getState) => {
	dispatch(setAppStatus('loading'))
		const state = getState()

		const task = state.tasks[todolistId].find((elem)=> elem.id === taskId)
		if (task) {
			const model:UpdateTaskModelType = {
				title: task.title,
				startDate: task.startDate,
				priority: task.priority,
				description: task.description,
				deadline: task.deadline,
				status: status,
			}

			tasksAPI.updateTasks(todolistId, taskId, model)
				.then(res => {
					if(res.data.resultCode === ResultCode.success) {
						console.log('update task', res)
						dispatch(changeTaskStatus(todolistId, status, taskId))
						dispatch(setAppStatus('succeeded'))
					} else {
						handleAppError(dispatch, res.data)
					}

				})
				.catch((err: AxiosError) => {
					handleNetworkError(dispatch, err.message)
				})
		}
}


export const updateTaskTitleTC = (todolistId:string, taskId: string, title:string): AppThunk => (dispatch, getState) => {
	dispatch(setAppStatus('loading'))
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
				if(res.data.resultCode === ResultCode.success) {
					console.log('update task', res)
					dispatch(changeTaskTitle(todolistId, taskId, title))
					dispatch(setAppStatus('succeeded'))
				} else {
					handleAppError(dispatch, res.data)
				}

			})
			.catch((err: AxiosError) => {
				handleNetworkError(dispatch, err.message)
			})
	}
}


