import React, {useCallback, useEffect} from 'react';
import {TasksType, TodolistsType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import RemoveBtn from "./components/RemoveBtn";
import Button from "@mui/material/Button";
import Task from "./state/Task";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {ChangeFilter, ChangeTitle, deleteTodolistTC, RemoveTodolist, updateTodolistTC} from "./state/todolistsReducer";
import {AddTask, createTaskTC, fetchTasksTC} from "./state/tasksReducer";

type TodolistPropsType = {
	id:string
}

export const Todolist:React.FC<TodolistPropsType> = React.memo(({id}) => {

	const dispatch = useDispatch()
	let todolist = useSelector<AppRootState,TodolistsType>(state => state.todolists.filter(tl => tl.id === id)[0])
	let tasks = useSelector<AppRootState, Array<TasksType>>(state => state.tasks[id])

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
		tasks = tasks.filter(t => !t.isDone);
	}
	if (todolist.filter === "completed") {
		tasks = tasks.filter(t => t.isDone);
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
		dispatch(updateTodolistTC(todolist.id, title))
	},[dispatch, todolist.id])

    return <div>
        <h3>
			<EditableSpan titleFromProps = {todolist.title} changeTask={callBackHandlerForUpdateTitle}/>
			<RemoveBtn name={'x'} callBack={removeTodolistCallBack}/>
		</h3>
		<AddItemForm callBackAddTask={callBackHandler}/>
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
