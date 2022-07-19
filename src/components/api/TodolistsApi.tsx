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

export type ResponseType<T = {}> = {
	resultCode: number
	messages: Array<string>
	data: T
}

export enum TaskStatuses  {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3
}

export enum TaskPriorities  {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4
}

export  type TaskType = {
	description: string,
	title: string,
	/*completed: boolean,*/
	status: TaskStatuses,
	priority: TaskPriorities,
	startDate: string,
	deadline: string,
	id: string,
	todoListId: string,
	order: number,
	addedDate: string
}

export type GetTasksResponseType = {
	error: string | null
	totalCount : number
	items: TaskType[]
}

export type UpdateTaskModelType = {
	title: string,
	description: string,
	//completed: boolean,
	status:TaskStatuses,
	priority: TaskPriorities,
	startDate: string,
	deadline: string,
}

export const todolistsAPI = {

	getTodolists() {
		return instance.get<TodolistType[]>(`/todo-lists`)
	},

	createTodolist(title: string) {
		return instance.post<ResponseType<{item : TodolistType}>>(`/todo-lists`, {title})
	},

	deleteTodolist(todolistId: string) {
		return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
	},

	updateTodolistTitle(todolistId: string, title: string) {
		return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
	},

	reorderTodolists(todolistId: string, putAfterItemId: string) {
		return instance.put(`/todo-lists/${todolistId}/reorder`, {putAfterItemId})
	},

}

export const tasksAPI = {

	getTasks(todolistId: string) {
		return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
	},

	postTasks(todolistId: string, title: string) {
		return instance.post<ResponseType<{item : TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
	},

	updateTasks(todolistId: string, taskId: string, model: UpdateTaskModelType ) {
		return instance.put<ResponseType<{item : TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
	},

	deleteTask(todolistId: string, taskId: string) {
		return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
	},

	reorderTasks(todolistId: string, taskId: string, putAfterItemId: string) {
		return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}/reorder`, {putAfterItemId})
	},

}

/*
export const GetTodolists = () => {

	const [state, setState] = useState<any>(null)
	const [inputPostState, setInputPostState] = useState<any>(null)
	const [btnPostState, setBtnPostState] = useState<any>(null)
	const [inputDeleteState, setInputDeleteState] = useState<any>(null)
	const [btnDeleteState, setBtnDeleteState] = useState<any>(null)

	useEffect(() => {
		todolistsAPI.getTodolists()
			.then(data =>{
				setState(data)
				console.log('get', data)
			} )
			.catch(err => console.log(err))
	}, [btnPostState, btnDeleteState])

	useEffect(() => {
		todolistsAPI.createTodolist(btnPostState)
			.then(data =>{
				console.log('post', data)
			} )
			.catch(err => console.log(err))
	}, [btnPostState])

	useEffect(() => {
		todolistsAPI.deleteTodolist(btnDeleteState)
			.then(data =>{
				console.log('delete', data)
			})
			.catch(err => console.log(err))
	}, [btnDeleteState])

	return <div>
		<div>
			<input value={inputPostState}  onChange={(e) => (setInputPostState(e.currentTarget.value))}/>
			<button onClick={()=>(setBtnPostState(inputPostState))}>postData</button>
		</div>
		<div>
			<input value={inputDeleteState} onChange={(e) => (setInputDeleteState(e.currentTarget.value))}/>
			<button onClick={()=>(setBtnDeleteState(inputDeleteState))}>deleteData</button>
		</div>
		<div>{JSON.stringify(state)}</div>

	</div>

}*/
