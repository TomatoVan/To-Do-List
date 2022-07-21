
import {AddTodolistAcType, RemoveTodolistACType, SetTodolistAcType} from "../Todolists/todolistsReducer";
import {tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/TodolistsApi";
import {AppThunk} from "../../state/store";
import {TasksStateType} from "../Todolists/TodolistsList";
//types
export type removeTaskACType = ReturnType<typeof RemoveTask>
export type addTaskACACType = ReturnType<typeof AddTask>
export type changeTaskStatusACType = ReturnType<typeof ChangeTaskStatus>
export type changeTaskTitleACType = ReturnType<typeof ChangeTaskTitle>
export type setTasksACType = ReturnType<typeof SetTasks>

export type TaskActionsType = removeTaskACType | addTaskACACType |changeTaskStatusACType | changeTaskTitleACType
	| AddTodolistAcType | RemoveTodolistACType | SetTodolistAcType | setTasksACType

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
export const RemoveTask = (todolistId:string, id:string) => ({type: "REMOVE-TASK" , payload:{todolistId, id}} as const)
export const AddTask = (task: TaskType) => ({type: "ADD-TASK" , payload:{task}} as const)
export const ChangeTaskStatus = (todolistId:string, status:TaskStatuses, taskId:string) => ({type: "CHANGE-TASK-STATUS" , payload:{todolistId,status, taskId}} as const)
export const ChangeTaskTitle = (todolistId:string,taskId:string, title:string ) => ({type: "CHANGE-TASK-TITLE" , payload:{todolistId,title, taskId}} as const)
export const SetTasks = (todolistId:string, tasks: TaskType[]) => ({type:"SET-TASKS", payload: {todolistId, tasks}} as const)

//TC
export const fetchTasksTC = (todolistId:string): AppThunk => (dispatch) => {
	tasksAPI.getTasks(todolistId)
		.then(res => {
			console.log('get task', res)
			dispatch(SetTasks(todolistId, res.data.items))
		})
	}


export const createTaskTC = (todolistId:string, title: string): AppThunk => (dispatch) => {
	tasksAPI.postTasks(todolistId, title)
		.then(res => {
			console.log('post task', res)
			let task = res.data.data.item
			dispatch(AddTask(task))
		})
	}


export const deleteTaskTC = (todolistId:string, taskId: string): AppThunk => (dispatch) => {
	tasksAPI.deleteTask(todolistId, taskId)
		.then(res => {
			console.log('delete task', res)
			dispatch(RemoveTask(todolistId, taskId))
		})
	}


export const updateTaskStatusTC = (todolistId:string, taskId: string, status:TaskStatuses): AppThunk => (dispatch, getState) => {
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
					console.log('update task', res)
					dispatch(ChangeTaskStatus(todolistId, status, taskId))
				})
		}
}


export const updateTaskTitleTC = (todolistId:string, taskId: string, title:string): AppThunk => (dispatch, getState) => {
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


