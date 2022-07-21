import React, {useCallback, useEffect} from 'react';
import {AddTodoBtn} from "../../features/addTodoBtn/AddTodoBtn";
import EditableSpan from "../../features/editableSpan/EditableSpan";
import RemoveTodoBtn from "../../features/removeTodoBtn/RemoveTodoBtn";
import Button from "@mui/material/Button";
import Task from "../Tasks/Task";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {ChangeFilter, deleteTodolistTC, TodolistDomainType, updateTodolistTitleTC} from "./todolistsReducer";
import {createTaskTC, fetchTasksTC} from "../Tasks/tasksReducer";
import {TaskStatuses, TaskType} from "../../api/TodolistsApi";

type TodolistPropsType = {
	id:string
}

export const Todolist:React.FC<TodolistPropsType> = React.memo(({id}) => {

	const dispatch = useDispatch()
	let todolist = useSelector<AppRootStateType,TodolistDomainType>(state => state.todolists.filter(tl => tl.id === id)[0])
	let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

	useEffect(()=> {
		dispatch(fetchTasksTC(todolist.id))
	}, [dispatch, todolist.id])

    const onAllClickHandler = useCallback(() => dispatch((ChangeFilter(todolist.id, "all"))),
		[dispatch, todolist.id]);
    const onActiveClickHandler = useCallback(() => dispatch((ChangeFilter(todolist.id, "active"))),
		[dispatch, todolist.id]);
    const onCompletedClickHandler = useCallback(() => dispatch((ChangeFilter(todolist.id, "completed"))),
		[dispatch, todolist.id]);


	if (todolist.filter === "active") {
		tasks = tasks.filter(t => t.status === TaskStatuses.New);
	}
	if (todolist.filter === "completed") {
		tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
	}

	const removeTodolistCallBack = useCallback(() => {
		// dispatch(RemoveTodolist(todolist.id))
		dispatch(deleteTodolistTC(todolist.id))
	},[dispatch, todolist.id])

	const callBackHandler = useCallback((title:string) => {
		// dispatch(AddTask(todolist.id, title))
		dispatch(createTaskTC(todolist.id, title))
	},[dispatch, todolist.id])

	const callBackHandlerForUpdateTitle = useCallback((title:string) => {
		// dispatch(ChangeTitle(todolist.id, title))
		dispatch(updateTodolistTitleTC(todolist.id, title))
	},[dispatch, todolist.id])

    return <div>
        <h3>
			<EditableSpan titleFromProps = {todolist.title} changeTask={callBackHandlerForUpdateTitle}/>
			<RemoveTodoBtn name={'x'} callBack={removeTodolistCallBack}/>
		</h3>
		<AddTodoBtn callBackAddTask={callBackHandler}/>
        <ul>
            {
				tasks.map(t => {
					return <Task key={t.id} taskId={t.id} todolistId={todolist.id} />
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
