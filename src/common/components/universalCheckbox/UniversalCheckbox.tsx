import React, { ChangeEvent, FC, memo, useCallback } from 'react'

import Checkbox from '@mui/material/Checkbox'

import { TaskStatuses } from '../../enums/taskStatuses'

type CheckboxesType = {
  checked: TaskStatuses
  changeBox: (event: TaskStatuses) => void
}

const UniversalCheckbox: FC<CheckboxesType> = memo(({ checked, changeBox }) => {
  const onChangeCallback = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      changeBox(e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    },
    [changeBox]
  )

  return (
    <Checkbox
      color="primary"
      onChange={onChangeCallback}
      checked={checked === TaskStatuses.Completed}
    />
  )
})

export default UniversalCheckbox
