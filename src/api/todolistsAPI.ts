import { instance } from './instance'
import { ResponseType } from './responceTypes'

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>(`/todo-lists`)
  },

  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>(`/todo-lists`, { title })
  },

  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
  },

  updateTodolistTitle(todolistId: string, title: string) {
    return instance.put<ResponseType>(`/todo-lists/${todolistId}`, { title })
  },

  reorderTodolists(todolistId: string, putAfterItemId: string) {
    return instance.put(`/todo-lists/${todolistId}/reorder`, { putAfterItemId })
  },
}

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
