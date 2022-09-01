import { TaskPriorities } from '../common/enums/taskPriorities'
import { TaskStatuses } from '../common/enums/taskStatuses'

import { instance } from './instance'
import { ResponseType } from './responceTypes'

export const tasksAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
  },

  postTasks(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {
      title,
    })
  },

  updateTasks(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<{ item: TaskType }>>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      model
    )
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
}

export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type GetTasksResponseType = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}
