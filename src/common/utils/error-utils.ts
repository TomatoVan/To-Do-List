import {setAppError, setAppStatus} from '../../app/appReducer';
import {Dispatch} from 'redux';
import {ResponseType} from '../../api/ResponceTypes';

export const handleNetworkError = (dispatch: Dispatch, message: string) => {
	dispatch(setAppError({error: message}))
	dispatch(setAppStatus({status: 'failed'}))
}

export const handleAppError = <T>(dispatch: Dispatch, data: ResponseType<T> ) => {
	if(data.messages.length) {
		dispatch(setAppError({error: data.messages[0]}))
	} else {
		dispatch(setAppError({error: 'Some error occurred'}))
	}
	dispatch(setAppStatus({status: 'failed'}))

}