import React from 'react'

import { CircularProgress } from '@material-ui/core'

import s from './CircularPreloader.module.css'

export const CircularPreloader = () => {
  return (
    <div className={s.circularProgress}>
      <CircularProgress />
    </div>
  )
}
