import React from 'react'

import { LinearProgress } from '@mui/material'

import { useAppSelector } from '../../hooks/useAppSelector'

import s from './LinearProgressBar.module.css'

export const LinearProgressBar = () => {
  const status = useAppSelector(state => state.app.status)

  return (
    <div>
      {status === 'loading' ? (
        <LinearProgress color="secondary" />
      ) : (
        <div className={s.loadingBar} />
      )}
    </div>
  )
}
