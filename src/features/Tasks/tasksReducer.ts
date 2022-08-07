import {ResultCode, tasksAPI, TaskStatuses, UpdateTaskModelType} from "../../api/TodolistsApi";
import {AppRootStateType} from "../../app/store";
import {TasksStateType} from "../Todolists/TodolistsList";
import {setAppStatus} from "../../app/appReducer";
import {handleAppError, handleNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
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

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks',
	async (todolistId:string, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		try {
			const res = await tasksAPI.getTasks(todolistId)
			thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
			console.log('get task', res)
			return {todolistId, tasks: res.data.items}
		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
		}

	})

export const createTaskTC = createAsyncThunk('tasks/createTask',
	async (param:{todolistId:string, title: string}, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		try {
			const res = await tasksAPI.postTasks(param.todolistId, param.title)
			if(res.data.resultCode === ResultCode.success) {
				thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
				console.log('post task', res)
				return {task: res.data.data.item}
			} else {
				handleAppError(thunkAPI.dispatch, res.data)
			}

		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
		}
	}
)

export const deleteTaskTC = createAsyncThunk('tasks/deleteTask',
	async (param:{todolistId:string, taskId: string}, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		try {
			const res = await tasksAPI.deleteTask(param.todolistId, param.taskId)
			if(res.data.resultCode === ResultCode.success) {
				thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
				console.log('delete task', res)
				return {todolistId: param.todolistId, taskId: param.taskId}
			}else {
 					handleAppError(thunkAPI.dispatch, res.data)
 				}
		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
		}
	}
)

export const updateTaskStatusTC = createAsyncThunk('tasks/updateTaskStatus',
	async (param:{todolistId:string, taskId: string, status:TaskStatuses}, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		try {
			const state = thunkAPI.getState() as AppRootStateType

			const task = state.tasks[param.todolistId].find((elem) => elem.id === param.taskId)
			if (task) {
				const model: UpdateTaskModelType = {
					title: task.title,
					startDate: task.startDate,
					priority: task.priority,
					description: task.description,
					deadline: task.deadline,
					status: param.status,
				}

				const res = await tasksAPI.updateTasks(param.todolistId, param.taskId, model)
				if (res.data.resultCode === ResultCode.success) {
					thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
					console.log('update task', res)
					return {todolistId: param.todolistId, taskId: param.taskId, status: param.status}
				} else {
					handleAppError(thunkAPI.dispatch, res.data)
				}
			}
		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
		}
	}
)

export const updateTaskTitleTC = createAsyncThunk('tasks/updateTaskTitle',
	async(params: {todolistId:string, taskId: string, title:string}, thunkAPI) => {
		thunkAPI.dispatch(setAppStatus({status: 'loading'}))
		try {
			const state = thunkAPI.getState() as AppRootStateType

			const task = state.tasks[params.todolistId].find((elem)=> elem.id === params.taskId)
			if (task) {
				const model:UpdateTaskModelType = {
					title: params.title,
					startDate: task.startDate,
					priority: task.priority,
					description: task.description,
					deadline: task.deadline,
					status: task.status
				}
				const res = await tasksAPI.updateTasks(params.todolistId, params.taskId, model)
				if (res.data.resultCode === ResultCode.success) {
					thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
					console.log('update task', res)
					return {todolistId: params.todolistId, taskId: params.taskId, title: params.title}
				} else {
					handleAppError(thunkAPI.dispatch, res.data)
				}
			}
		} catch (err: any) {
			handleNetworkError(thunkAPI.dispatch, err.message)
		}

})

const slice = createSlice({
	name:'tasks',
	initialState: initialState,
	reducers: {},
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
		builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
			if (action.payload) {
				state[action.payload.todolistId] =  action.payload.tasks
			}
		});
		builder.addCase(createTaskTC.fulfilled, (state, action) => {
			if (action.payload) {
				const tasks = state[action.payload.task.todoListId]
				tasks.unshift(action.payload.task)
			}
		});
		builder.addCase(deleteTaskTC.fulfilled, (state, action) => {
			if (action.payload) {
				const tasks = state[action.payload.todolistId]
				const taskIndex = tasks.findIndex(t => t.id === action.payload?.taskId)
				tasks.splice(taskIndex, 1)
			}
		});
		builder.addCase(updateTaskStatusTC.fulfilled, (state, action) => {
			if (action.payload) {
				const tasks = state[action.payload.todolistId]
				const taskIndex = tasks.findIndex(tl => tl.id === action.payload?.taskId)
				tasks[taskIndex].status = action.payload.status
			}
		});
		builder.addCase(updateTaskTitleTC.fulfilled, (state, action) => {
			if (action.payload) {
				const tasks = state[action.payload.todolistId]
				const taskIndex = tasks.findIndex(tl => tl.id === action.payload?.taskId)
				tasks[taskIndex].title = action.payload.title
			}
		});

	}
})

//reducer
export const tasksReducer = slice.reducer











