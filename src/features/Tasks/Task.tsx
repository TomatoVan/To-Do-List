import React, {useCallback} from 'react';
import UniversalCheckbox from "../../components/universalCheckbox/UniversalCheckbox";
import EditableSpan from "../../components/editableSpan/EditableSpan";
import RemoveItemBtn from "../../components/removeItemBtn/RemoveItemBtn";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../components/app/store";
import {deleteTaskTC, updateTaskStatusTC, updateTaskTitleTC} from "./tasksReducer";
import {TaskStatuses, TaskType} from "../../api/TodolistsApi";

type TaskPropsType = {
	todolistId:string
	taskId:string
}

const Task:React.FC<TaskPropsType> = React.memo(({ todolistId, taskId }) => {

	const task = useSelector<AppRootStateType,TaskType>(state => state.tasks[todolistId].filter(t => t.id === taskId)[0])
	const dispatch = useDispatch()


	const changeStatus = useCallback((status: TaskStatuses) => {
		// dispatch(ChangeTaskStatus(todolistId, status, taskId))
		dispatch(updateTaskStatusTC(todolistId, taskId, status))

	}, [dispatch, taskId, todolistId])

	const changeTask = useCallback((title:string) => {
		// dispatch(ChangeTaskTitle(todolistId, title, taskId))
		dispatch(updateTaskTitleTC(todolistId, taskId, title))
	}, [dispatch, taskId, todolistId])

	const removeTask = useCallback(() => {
		// dispatch(RemoveTask(todolistId, taskId))
		dispatch(deleteTaskTC(todolistId, taskId))
	}, [dispatch, taskId, todolistId])

	return (
		<li key={taskId} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
			<UniversalCheckbox changeBox={(e) => changeStatus(e)} checked={task.status}/>
			<EditableSpan  titleFromProps = {task.title} changeTask={(title)=> changeTask(title)}/>
			<RemoveItemBtn name={'x'} callBack={() =>removeTask()}/>
		</li>
	)
});

export default Task;
