
//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState
type ActionsType = any

// initial state
const initialState = {
	status: 'loading' as RequestStatusType
}

//reducer
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return {...state, status: action.status}
		default:
			return state
	}
}

//AC

//TC
