import React, { useEffect } from 'react'

import './App.css'
import Container from '@mui/material/Container'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ButtonAppBar } from '../common/components/buttonAppBar/ButtonAppBar'
import { CircularPreloader } from '../common/components/CircularPreloader/CircularPreloader'
import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { LinearProgressBar } from '../common/components/linearProgressBar/LinearProgressBar'
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
    return <CircularPreloader />
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <ButtonAppBar />
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
