import React, { FC, memo, useCallback } from 'react'

import { useSelector } from 'react-redux'

import { TaskType } from '../../api/tasksAPI'
import { AppRootStateType } from '../../app/store'
import EditableSpan from '../../common/components/editableSpan/EditableSpan'
import RemoveItemBtn from '../../common/components/removeItemBtn/RemoveItemBtn'
import UniversalCheckbox from '../../common/components/universalCheckbox/UniversalCheckbox'
import { TaskStatuses } from '../../common/enums/taskStatuses'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'

import { deleteTask, updateTaskStatus, updateTaskTitle } from './tasksReducer'

type TaskPropsType = {
  todolistId: string
  taskId: string
}

const Task: FC<TaskPropsType> = memo(({ todolistId, taskId }) => {
  const task = useSelector<AppRootStateType, TaskType>(
    state => state.tasks[todolistId].filter(t => t.id === taskId)[0]
  )
  const dispatch = useAppDispatch()

  const changeStatus = useCallback(
    (status: TaskStatuses) => {
      dispatch(updateTaskStatus({ todolistId, taskId, status }))
    },
    [dispatch, taskId, todolistId]
  )

  const changeTask = useCallback(
    (title: string) => {
      dispatch(updateTaskTitle({ todolistId, taskId, title }))
    },
    [dispatch, taskId, todolistId]
  )

  const removeTask = useCallback(() => {
    dispatch(deleteTask({ todolistId, taskId }))
  }, [dispatch, taskId, todolistId])

  return (
    <li key={taskId} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
      <UniversalCheckbox changeBox={e => changeStatus(e)} checked={task.status} />
      <EditableSpan titleFromProps={task.title} changeTask={title => changeTask(title)} />
      <RemoveItemBtn name={'x'} callBack={() => removeTask()} />
    </li>
  )
})

export default Task
