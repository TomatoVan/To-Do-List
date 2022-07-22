//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState

export type setAppStatusACType = ReturnType<typeof setAppStatus>
export type setAppErrorACType = ReturnType<typeof setAppError>

export type AppActionsType = setAppStatusACType | setAppErrorACType

// initial state
const initialState = {
	status: 'loading' as RequestStatusType,
	error: null as null | string
}

//reducer
export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return {...state, status: action.payload.status}
		case "APP/SET-ERROR": {
			return {...state, error: action.payload.error}
		}
		default:
			return state
	}
}

//AC

export const setAppStatus = (status:RequestStatusType ) => ({type: 'APP/SET-STATUS', payload: {status}} as const)
export const setAppError = (error: null | string ) => ({type: 'APP/SET-ERROR', payload: {error}} as const)

//TC
