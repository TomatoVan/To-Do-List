export type FieldErrorType = { field: string, error: string }

export type ResponseType<T = {}> = {
	resultCode: number
	messages: Array<string>
	fieldsErrors?: Array<FieldErrorType>
	data: T
}