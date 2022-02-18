import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@material-ui/core";

type PropsType = {
	callBackAddTask: (title: string) => void
}

export const AddItemForm:React.FC<PropsType> = React.memo(({callBackAddTask}) => {


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
			/>

			<Button variant = "contained" color="primary" onClick={addTask} style={{maxWidth: '38px', maxHeight:'38px', minWidth:'38px', minHeight:'38px' }} >+</Button>
		</div>
	);
})