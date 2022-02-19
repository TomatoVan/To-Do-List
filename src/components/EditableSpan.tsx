import React, {ChangeEvent, useCallback, useState} from 'react';
import s from './EditableSpan.module.css'

type EditableSpanPropsType = {
	titleFromProps:string
	changeTask:(title:string) => void
}

const EditableSpan:React.FC<EditableSpanPropsType> = React.memo(({titleFromProps, changeTask}) => {
	const[title, setTitle] = useState(titleFromProps)

	const [edit, setEdit] = useState(false)

	const onDoubleClickHandler =() => {
		setEdit(true)
	}

	const onBlurHandler = useCallback(() => {
		setEdit(false)
		changeTask(title)
	},[changeTask, title])

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	return (
		edit ? <input className={s.text} value={title} onChange={onChangeHandler} autoFocus onBlur={onBlurHandler}/>
			 : <span className={s.text} onDoubleClick={onDoubleClickHandler}>{titleFromProps}</span>
	);
});

export default EditableSpan;
