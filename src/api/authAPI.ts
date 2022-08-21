import {instance} from './instance';
import {ResponseType} from './ResponceTypes';

export const authAPI = {
	me() {
		return instance.get<ResponseType<MeResponseType>>(`/auth/me`)
	},
	login(data : LoginParamsType) {
		return instance.post<ResponseType<{userId: number}>>(`/auth/login`, data)
	},
	logout() {
		return instance.delete<ResponseType>(`/auth/login`)
	},
}

export type LoginParamsType = {
	email: string,
	password: string,
	rememberMe?: boolean,
	captcha?: string
}

export type MeResponseType = {
	id: number,
	email: string,
	login:string,
}