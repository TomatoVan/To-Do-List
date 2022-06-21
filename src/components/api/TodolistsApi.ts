import axios from "axios";

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.1',
	headers: {
		"API-KEY": "e53bd4e2-48e0-477a-b70a-83002085f133"
	}
})

export type TodolistType = {
	id: string
	title: string
	addedDate: string
	order: number
}

type ResponseType<D> = {
	resultCode: number
	messages: Array<string>
	data: D
}

export type TaskType = {
	description: string,
	title: string,
	completed: boolean,
	status:number,
	priority: number,
	startDate: string,
	deadline: string,
	id: string,
	todoListId: string,
	order: number,
	addedDate: string
}

type GetTasksResponseType = {
	error: string | null
	totalCount : number
	items: TaskType[]
}

export const todolistsAPI = {

	getTodolists() {
		return instance.get<TodolistType[]>(`/todo-lists`)
			.then(res => res.data)
	},

	createTodolist(title: string) {
		return instance.post<ResponseType<{item : TodolistType}>>(`/todo-lists`, {title})
			.then(res => res.data)
	},

	deleteTodolist(todolistId: string) {
		return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`)
			.then(res => res.data)
	},

	updateTodolistTitle(todolistId: string, title: string) {
		return instance.put<ResponseType<{}>>(`/todo-lists/${todolistId}`, {title})
			.then(res => res.data)
	},

	reorderTodolists(todolistId: string, putAfterItemId: string) {
		return instance.put(`/todo-lists/${todolistId}/reorder`, {putAfterItemId})
			.then(res => res.data)
	},

}

export const tasksAPI = {

	getTasks(todolistId: string) {
		return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
			.then(res => res.data)
	},

	postTasks(todolistId: string, title: string) {
		return instance.post<ResponseType<{item : TaskType}>>(`/todo-lists`, {title})
			.then(res => res.data)
	},

	//put tasks

	deleteTask(todolistId: string, taskId: string) {
		return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
			.then(res => res.data)
	}

}