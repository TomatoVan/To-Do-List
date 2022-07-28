import {ResultCode, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/TodolistsApi";
import {AppThunk} from "../../app/store";
import {TasksStateType} from "../Todolists/TodolistsList";
import {setAppStatus} from "../../app/appReducer";
import {AxiosError} from "axios";
import {handleAppError, handleNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolist, removeTodolist, setTodolist} from "../Todolists/todolistsReducer";

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

const slice = createSlice({
	name:'tasks',
	initialState: initialState,
	reducers: {
		removeTask(state, action:PayloadAction<{todolistId:string, taskId:string}>){
			const tasks = state[action.payload.todolistId]
			const taskIndex = tasks.findIndex(t => t.id === action.payload.taskId)
			tasks.splice(taskIndex, 1)
		},
		addTask(state, action:PayloadAction<{task: TaskType}>){
			const tasks = state[action.payload.task.todoListId]
			tasks.unshift(action.payload.task)
		},
		changeTaskStatus(state, action:PayloadAction<{todolistId:string, status:TaskStatuses, taskId:string}>){
			const tasks = state[action.payload.todolistId]
			const taskIndex = tasks.findIndex(tl => tl.id === action.payload.taskId)
			tasks[taskIndex].status = action.payload.status

		},
		changeTaskTitle(state, action:PayloadAction<{todolistId:string, taskId:string, title:string}>){
			const tasks = state[action.payload.todolistId]
			const taskIndex = tasks.findIndex(tl => tl.id === action.payload.taskId)
			tasks[taskIndex].title = action.payload.title
		},
		setTasks(state, action:PayloadAction<{todolistId:string, tasks: TaskType[]}>){
			state[action.payload.todolistId] =  action.payload.tasks

		},
	},
	extraReducers: (builder) => {
		builder.addCase(addTodolist, (state, action) => {
			state[action.payload.todolistId] = []
		});
		builder.addCase(removeTodolist, (state, action) => {
			delete state[action.payload.todolistId]
		});
		builder.addCase(setTodolist, (state, action) => {
			action.payload.todolists.forEach((tl) => {
				state[tl.id] = []
			})
		});

	}
})

//reducer
export const tasksReducer = slice.reducer
export const {removeTask, addTask, changeTaskStatus, changeTaskTitle, setTasks} = slice.actions

//TC
export const fetchTasksTC = (todolistId:string): AppThunk => (dispatch) => {
	dispatch(setAppStatus({status: 'loading'}))
	tasksAPI.getTasks(todolistId)
		.then(res => {
			console.log('get task', res)
			dispatch(setTasks({todolistId, tasks: res.data.items}))
			dispatch(setAppStatus({status: 'succeeded'}))
		})
		.catch((err: AxiosError) => {
			handleNetworkError(dispatch, err.message)
		})
	}

export const createTaskTC = (todolistId:string, title: string): AppThunk => (dispatch) => {
	dispatch(setAppStatus({status: 'loading'}))
	tasksAPI.postTasks(todolistId, title)
		.then(res => {
			if(res.data.resultCode === ResultCode.success) {
				console.log('post task', res)
				let task = res.data.data.item
				dispatch(addTask({task}))
				dispatch(setAppStatus({status: 'succeeded'}))
			} else {
				handleAppError(dispatch, res.data)
			}

		})
		.catch((err: AxiosError) => {
			handleNetworkError(dispatch, err.message)
		})
	}


export const deleteTaskTC = (todolistId:string, taskId: string): AppThunk => (dispatch) => {
	dispatch(setAppStatus({status: 'loading'}))
	tasksAPI.deleteTask(todolistId, taskId)
		.then(res => {
			if(res.data.resultCode === ResultCode.success) {
				console.log('delete task', res)
				dispatch(removeTask({todolistId, taskId}))
				dispatch(setAppStatus({status: 'succeeded'}))
			} else {
				handleAppError(dispatch, res.data)
			}

		})
		.catch((err: AxiosError) => {
			handleNetworkError(dispatch, err.message)
		})
	}


export const updateTaskStatusTC = (todolistId:string, taskId: string, status:TaskStatuses): AppThunk => (dispatch, getState) => {
	dispatch(setAppStatus({status: 'loading'}))
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
						dispatch(changeTaskStatus({todolistId, status, taskId}))
						dispatch(setAppStatus({status: 'succeeded'}))
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
	dispatch(setAppStatus({status: 'loading'}))
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
					dispatch(changeTaskTitle({todolistId, taskId, title}))
					dispatch(setAppStatus({status: 'succeeded'}))
				} else {
					handleAppError(dispatch, res.data)
				}

			})
			.catch((err: AxiosError) => {
				handleNetworkError(dispatch, err.message)
			})
	}
}


