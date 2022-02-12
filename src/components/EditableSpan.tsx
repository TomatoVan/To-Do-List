import React, {ChangeEvent, useState} from 'react';
import s from './EditableSpan.module.css'

type PropsType = {
	title:string
	changeTask:(title:string) => void
}

const EditableSpan = (props:PropsType) => {
	const[title, setTitle] = useState(props.title)

	const [edit, setEdit] = useState(false)

	const onDoubleClickHandler = () => {
		setEdit(true)
	}

	const onBlurHandler = () => {
		setEdit(false)
		props.changeTask(title)
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	return (
		edit ? <input className={s.text} value={title} onChange={onChangeHandler} autoFocus onBlur={onBlurHandler}/>
			 : <span className={s.text} onDoubleClick={onDoubleClickHandler}>{props.title}</span>
	);
};

export default EditableSpan;
