import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import RemoveBtn from "./components/RemoveBtn";
import Button from "@mui/material/Button";
import UniversalCheckbox from "./components/UniversalCheckbox";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
	id:string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId:string) => void
    changeFilter: (value: FilterValuesType, id:string) => void
    addTask: (title: string, todolistId:string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId:string) => void
    filter: FilterValuesType
	removeTodolist:(id:string) => void
	changeTask:(title:string, id:string, todolistID:string) => void
	changeTitle:(title:string, id:string) => void
}

export const Todolist = (props: PropsType) => {

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id),
		[props.changeFilter,props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id),
		[props.changeFilter,props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id),
		[props.changeFilter,props.id]);

	const removeTodolistCallBack = useCallback(() => {
		props.removeTodolist(props.id)
	},[props.removeTodolist, [props.id]])

	const removeTaskCallBack = useCallback((tID:string) => {
			props.removeTask(tID, props.id)
	},[props.removeTask, props.id])

	const onChangeHandler = useCallback((tID:string, event:boolean) => {
		props.changeTaskStatus(tID, event, props.id);
	},[props.changeTaskStatus, props.id])

	const callBackHandler = useCallback((title:string) => {
		props.addTask(title,props.id)
	},[props.addTask,props.id ])

	const callBackHandlerForUpdateTask = useCallback((tID:string, title:string) => {
		props.changeTask(props.id,tID, title)
	},[props.changeTask, props.id])

	const callBackHandlerForUpdateTitle = useCallback((title:string) => {
		props.changeTitle(props.id, title)
	},[props.changeTitle, props.id])

    return <div>
        <h3>
			<EditableSpan title = {props.title} changeTask={callBackHandlerForUpdateTitle}/>
			<RemoveBtn name={'x'} callBack={removeTodolistCallBack}/>
		</h3>
		<AddItemForm callBackAddTask={callBackHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
						<UniversalCheckbox changeBox={(e) => onChangeHandler(t.id, e)} checked={t.isDone}/>
						<EditableSpan title = {t.title} changeTask={(title)=>callBackHandlerForUpdateTask(t.id, title)}/>
                        <RemoveBtn name={'x'} callBack={() =>removeTaskCallBack(t.id)}/>
                    </li>
                })
            }
        </ul>
        <div>
			<Button variant={props.filter === 'all' ? "contained" : "outlined"}
					color="success" onClick={onAllClickHandler} >All</Button>
			<Button variant={props.filter === 'active' ? "contained" : "outlined"}
					color="primary" onClick={onActiveClickHandler}>Active</Button>
			<Button variant={props.filter === 'completed' ? "contained" : "outlined"}
					color="secondary" onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}
