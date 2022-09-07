import React, { useEffect } from 'react'

import './App.css'
import Container from '@mui/material/Container'
import { Navigate, Route, Routes } from 'react-router-dom'

import { CircularPreloader } from '../common/components/circularPreloader/CircularPreloader'
import { ErrorSnackbar } from '../common/components/errorSnackbar/ErrorSnackbar'
import { HeaderBar } from '../common/components/headerBar/HeaderBar'
import { LinearProgressBar } from '../common/components/linearProgressBar/LinearProgressBar'
import { useAppDispatch } from '../common/hooks/useAppDispatch'
import { useAppSelector } from '../common/hooks/useAppSelector'
import { Login } from '../features/login/Login'
import { TodolistsList } from '../features/todolists/TodolistsList'

import { initializeApp } from './appReducer'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch])

  const status = useAppSelector(state => state.app.status)
  const isInitialized = useAppSelector(state => state.app.isInitialized)

  if (!isInitialized) {
    return <CircularPreloader />
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <HeaderBar />
      {status === 'loading' && <LinearProgressBar />}
      <Container fixed>
        <Routes>
          <Route path="/" element={<TodolistsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<h1 className="notFound">404 page not found</h1>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
