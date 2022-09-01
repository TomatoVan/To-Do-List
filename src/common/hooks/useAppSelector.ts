import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { AppRootStateType } from '../../app/store'

//useSelector typification
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
