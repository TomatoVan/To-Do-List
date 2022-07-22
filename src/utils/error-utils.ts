import {setAppError, setAppStatus} from "../app/appReducer";
import {Dispatch} from "redux";
import {AllAppActionsType} from "../app/store";
import {ResponseType} from "../api/TodolistsApi";

export const handleNetworkError = (dispatch: Dispatch<AllAppActionsType>, message: string) => {
	dispatch(setAppError(message))
	dispatch(setAppStatus('failed'))
}

export const handleAppError = <T>(dispatch: Dispatch<AllAppActionsType>, data: ResponseType<T> ) => {
	if(data.messages.length) {
		dispatch(setAppError(data.messages[0]))
	} else {
		dispatch(setAppError('Some error occurred'))
	}
	dispatch(setAppStatus('failed'))

}