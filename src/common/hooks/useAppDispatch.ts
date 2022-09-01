import { useDispatch } from 'react-redux'

import { store } from '../../app/store'

//dispatch typification
// export type ThunkDispatchType = ThunkDispatch<AppRootStateType, unknown, AllAppActionsType>;
// export const useAppDispatch = () => useDispatch<ThunkDispatchType>();

//dispatch typification for toolkit
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
