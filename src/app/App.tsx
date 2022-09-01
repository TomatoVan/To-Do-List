import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@material-ui/core'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ButtonAppBar } from '../common/components/buttonAppBar/ButtonAppBar'
import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { Login } from '../features/Login/Login'
import { TodolistsList } from '../features/Todolists/TodolistsList'

import { initializeApp } from './appReducer'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch])

  const status = useAppSelector(state => state.app.status)
  const isInitialized = useAppSelector(state => state.app.isInitialized)

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <ButtonAppBar />
      {status === 'loading' && <LinearProgress color={'secondary'} />}
      <Container fixed>
        <Routes>
          <Route path="/" element={<TodolistsList />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/404"
            element={<h1 style={{ textAlign: 'center' }}>404 page not found</h1>}
          />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
