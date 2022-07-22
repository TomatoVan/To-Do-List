import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import {RequestStatusType} from "../../app/appReducer";

type PropsType = {
	callBackAddTask: (title: string) => void,
	entityStatus? : RequestStatusType
}

export const AddItemBtn:React.FC<PropsType> = React.memo(({callBackAddTask, entityStatus}) => {


	let [title, setTitle] = useState("")
	let [error, setError] = useState<boolean>(false)

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}
	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error) setError(false);
		if (e.key === 'Enter') {
			addTask();
		}
	}

	const addTask = () => {
		if (title.trim() !== "") {
			callBackAddTask(title.trim());
			setTitle("");
		} else {
			setError(true);
		}
	}

	return(
		<div>
			<TextField id="outlined-basic"
					   size="small"
					   error={error}
					   label={error ? 'Title is required' : 'Add new'}
					   variant="outlined"
					   value={title}
					   onChange={onChangeHandler}
					   onKeyPress={onKeyPressHandler}
					   className={error ? "error" : ""}
					   disabled={entityStatus === 'loading'}
			/>

			<Button variant = "contained" color="primary" onClick={addTask} disabled={entityStatus === 'loading'} style={{maxWidth: '38px', maxHeight:'38px', minWidth:'38px', minHeight:'38px' }} >+</Button>
		</div>
	);
})