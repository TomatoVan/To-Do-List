import React, { useCallback, useEffect } from 'react'

import { Grid, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { TaskType } from '../../api/tasksAPI'
import { AppRootStateType } from '../../app/store'
import { AddItemBtn } from '../../common/components/addItemBtn/AddItemBtn'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'

import { Todolist } from './Todolist'
import { createTodolist, setTodolists, TodolistDomainType } from './todolistsReducer'

export type TasksStateType = {
  [key: string]: TaskType[]
}

export const TodolistsList = () => {
  const dispatch = useAppDispatch()
  const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  useEffect(() => {
    isLoggedIn && dispatch(setTodolists())
  }, [dispatch, isLoggedIn])

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(createTodolist(title))
    },
    [dispatch]
  )

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemBtn callBackAddTask={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map(tl => {
          return (
            <Grid key={tl.id} item>
              <Paper elevation={4} style={{ padding: '10px' }}>
                <Todolist key={tl.id} id={tl.id} />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
