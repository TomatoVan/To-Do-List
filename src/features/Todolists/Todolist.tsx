import React, {useCallback, useEffect} from 'react';
import {AddItemBtn} from "../../components/addItemBtn/AddItemBtn";
import EditableSpan from "../../components/editableSpan/EditableSpan";
import RemoveItemBtn from "../../components/removeItemBtn/RemoveItemBtn";
import Button from "@mui/material/Button";
import Task from "../Tasks/Task";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {changeTodolistFilter, deleteTodolistTC, TodolistDomainType, updateTodolistTitleTC} from "./todolistsReducer";
import {createTaskTC, fetchTasksTC} from "../Tasks/tasksReducer";
import {TaskStatuses, TaskType} from "../../api/TodolistsApi";

type TodolistPropsType = {
	id:string
}

export const Todolist:React.FC<TodolistPropsType> = React.memo(({id}) => {

	const dispatch = useAppDispatch()
	let todolist = useSelector<AppRootStateType,TodolistDomainType>(state => state.todolists.filter(tl => tl.id === id)[0])
	let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

	useEffect(()=> {
		dispatch(fetchTasksTC(todolist.id))
	}, [dispatch, todolist.id])

    const onAllClickHandler = useCallback(() => dispatch((changeTodolistFilter({todolistId: todolist.id, filter:"all"}))),
		[dispatch, todolist.id]);
    const onActiveClickHandler = useCallback(() => dispatch((changeTodolistFilter({todolistId: todolist.id, filter: "active"}))),
		[dispatch, todolist.id]);
    const onCompletedClickHandler = useCallback(() => dispatch((changeTodolistFilter({todolistId: todolist.id, filter: "completed"}))),
		[dispatch, todolist.id]);


	if (todolist.filter === "active") {
		tasks = tasks.filter(t => t.status === TaskStatuses.New);
	}
	if (todolist.filter === "completed") {
		tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
	}

	const removeTodolistCallBack = useCallback(() => {
		dispatch(deleteTodolistTC(todolist.id))
	},[dispatch, todolist.id])

	const callBackHandler = useCallback((title:string) => {
		dispatch(createTaskTC(todolist.id, title))
	},[dispatch, todolist.id])

	const callBackHandlerForUpdateTitle = useCallback((title:string) => {
		dispatch(updateTodolistTitleTC(todolist.id, title))
	},[dispatch, todolist.id])

    return <div>
        <h3>
			<EditableSpan titleFromProps = {todolist.title} changeTask={callBackHandlerForUpdateTitle}/>
			<RemoveItemBtn name={'x'} callBack={removeTodolistCallBack} entityStatus = {todolist.entityStatus}/>
		</h3>
		<AddItemBtn callBackAddTask={callBackHandler} entityStatus = {todolist.entityStatus}/>
        <ul>
            {
				tasks.map(t => {
					return <Task key={t.id} taskId={t.id} todolistId={todolist.id}  />
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
})
