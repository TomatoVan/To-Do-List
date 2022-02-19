import React from 'react';
import {FilterValuesType, TasksStateType, TasksType, TodolistsType} from '../App';
import {AddItemForm} from "../components/AddItemForm";
import EditableSpan from "../components/EditableSpan";
import RemoveBtn from "../components/RemoveBtn";
import Button from "@mui/material/Button";
import UniversalCheckbox from "../components/UniversalCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {ChangeFilter, ChangeTitle, RemoveTodolist} from "../state/todolistsReducer";
import {AddTask, ChangeTaskStatus, ChangeTaskTitle, RemoveTask} from "../state/tasksReducer";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
	id:string

}

export const Todolist = (props: PropsType) => {

	const dispatch = useDispatch()
	let todolist = useSelector<AppRootState,TodolistsType>(state => state.todolists.filter(tl => tl.id === props.id)[0])
	let tasks = useSelector<AppRootState,Array<TasksType>>(state => state.tasks[props.id])

	if (todolist.filter === "active") {
		tasks = tasks.filter(t => !t.isDone);
	}
	if (todolist.filter === "completed") {
		tasks = tasks.filter(t => t.isDone);
	}

    const onAllClickHandler = () => dispatch(ChangeFilter(props.id, "all"));
    const onActiveClickHandler = () =>  dispatch(ChangeFilter(props.id, "active"));
    const onCompletedClickHandler = () =>  dispatch(ChangeFilter(props.id, "completed"));

	const removeTodolistCallBack = () => dispatch(RemoveTodolist(props.id))

	const removeTaskCallBack = (tID:string) => dispatch(RemoveTask(tID, props.id))

	const onChangeHandler = (tID:string, event:boolean) => dispatch(ChangeTaskStatus(tID, event, props.id))

	const callBackHandler = (title:string) => dispatch(AddTask(props.id,title))

	const callBackHandlerForUpdateTask = (tID:string, title:string) => dispatch(ChangeTaskTitle(tID,title,props.id))

	const callBackHandlerForUpdateTitle = (title:string) => dispatch(ChangeTitle(props.id, title))




    return <div>
        <h3>
			<EditableSpan titleFromProps = {todolist.title} changeTask={callBackHandlerForUpdateTitle}/>
			<RemoveBtn name={'x'} callBack={removeTodolistCallBack}/>
		</h3>
		<AddItemForm callBackAddTask={callBackHandler}/>
        <ul>
            {
				tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
						<UniversalCheckbox changeBox={(e) => onChangeHandler(t.id, e)} checked={t.isDone}/>
						<EditableSpan titleFromProps = {t.title} changeTask={(title)=>callBackHandlerForUpdateTask(t.id, title)}/>
                        <RemoveBtn name={'x'} callBack={() =>removeTaskCallBack(t.id)}/>
                    </li>
                })
            }
        </ul>
        <div>
			<Button variant={todolist.filter === 'all' ? "contained" : "outlined"}
					color="success" onClick={onAllClickHandler} >All</Button>
			<Button variant={todolist.filter === 'active' ? "contained" : "outlined"}
					color="primary" onClick={onActiveClickHandler}>Active</Button>
			<Button variant={todolist.filter === 'completed' ? "contained" : "outlined"}
					color="secondary" onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}
