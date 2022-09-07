import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { authReducer } from '../features/login/authReducer'
import { tasksReducer } from '../features/tasks/tasksReducer'
import { todolistsReducer } from '../features/todolists/todolistsReducer'

import { appReducer } from './appReducer'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

// export const store = createStore(rootReducer, applyMiddleware(thunk))
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})

//state typification
export type AppRootStateType = ReturnType<typeof rootReducer>

//all reducers types
// export type AllAppActionsType = TaskActionsType | TodolistsActionsType | AppActionsType | AuthActionsType

//thunk creator typification
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllAppActionsType>
