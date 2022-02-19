import React, {useCallback} from 'react';
import UniversalCheckbox from "../components/UniversalCheckbox";
import EditableSpan from "../components/EditableSpan";
import RemoveBtn from "../components/RemoveBtn";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import { TasksType} from "../App";
import {ChangeTaskStatus, ChangeTaskTitle, RemoveTask} from "./tasksReducer";

type TaskPropsType = {
	todolistId:string
	taskId:string
}

const Task:React.FC<TaskPropsType> = React.memo(({ todolistId, taskId }) => {

	const task = useSelector<AppRootState,TasksType>(state => state.tasks[todolistId].filter(t => t.id === taskId)[0])
	const dispatch = useDispatch()


	const changeStatus = useCallback((isDone: boolean) => {
		dispatch(ChangeTaskStatus(todolistId, isDone, taskId))
	}, [dispatch, taskId, todolistId])

	const changeTask = useCallback((title:string) => {
		dispatch(ChangeTaskTitle(todolistId, title, taskId))
	}, [dispatch, taskId, todolistId])

	const removeTask = useCallback(() => {
		dispatch(RemoveTask(todolistId, taskId))
	}, [dispatch, taskId, todolistId])

	return (
		<li key={taskId} className={task.isDone ? "is-done" : ""}>
			<UniversalCheckbox changeBox={(e) => changeStatus(e)} checked={task.isDone}/>
			<EditableSpan titleFromProps = {task.title} changeTask={(title)=>changeTask(title)}/>
			<RemoveBtn name={'x'} callBack={() =>removeTask()}/>
		</li>
	)
});

export default Task;
