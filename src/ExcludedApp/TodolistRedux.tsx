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

//IN APP.TSX

// const changeTitle = useCallback((id:string, title:string) => {
// 	dispatch(ChangeTitle(id, title))
// },[dispatch])
//
//
// const removeTodolist = useCallback((id: string) => {
// 	let action = RemoveTodolist(id)
// 	dispatch(action)
// },[dispatch])
//
// const changeFilter = useCallback((value: FilterValuesType, id: string) => {
// 	dispatch(ChangeFilter(id, value))
// },[dispatch])
//
// const addTask = useCallback((title: string, todolistId: string) => {
// 	dispatch(AddTask(todolistId, title))
// }, [dispatch])

// const changeTask = useCallback((todolistID:string,id:string, title:string) => {
// 	dispatch(ChangeTaskTitle(todolistID, title, id))
// }, [dispatch])

// const removeTask = useCallback((id: string, todolistId: string) => {
// 	dispatch(RemoveTask(todolistId, id))
// }, [dispatch])
//

// const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
// 	 	dispatch(ChangeTaskStatus(todolistId, isDone, taskId))
// 	 }, [dispatch])


//IN TODOLIST.TSX


/*



import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import RemoveBtn from "./components/RemoveBtn";
import Button from "@mui/material/Button";
import Task from "./state/Task";


type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type TodolistPropsType = {
	id:string
	title: string
	tasks: Array<TaskType>
	changeFilter: (value: FilterValuesType, id:string) => void
	filter: FilterValuesType
	removeTodolist:(id:string) => void
	changeTitle:(title:string, id:string) => void
	addTask: (title: string, todolistId:string) => void
}

export const Todolist:React.FC<TodolistPropsType> = React.memo(({
																	id,
																	title,
																	tasks,
																	changeFilter,
																	addTask,
																	filter,
																	removeTodolist,
																	changeTitle}) => {

	const onAllClickHandler = useCallback(() => changeFilter("all", id),
		[changeFilter,id]);
	const onActiveClickHandler = useCallback(() => changeFilter("active", id),
		[changeFilter,id]);
	const onCompletedClickHandler = useCallback(() => changeFilter("completed", id),
		[changeFilter,id]);

	let tasksForTodolist = tasks

	if (filter === "active") {
		tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
	}
	if (filter === "completed") {
		tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
	}

	const removeTodolistCallBack = useCallback(() => {
		removeTodolist(id)
	},[removeTodolist, id])

	const callBackHandler = useCallback((title:string) => {
		addTask(title,id)
	},[addTask,id])

	const callBackHandlerForUpdateTitle = useCallback((title:string) => {
		changeTitle(id, title)
	},[changeTitle, id])

	return <div>
		<h3>
			<EditableSpan titleFromProps = {title} changeTask={callBackHandlerForUpdateTitle}/>
			<RemoveBtn name={'x'} callBack={removeTodolistCallBack}/>
		</h3>
		<AddItemForm callBackAddTask={callBackHandler}/>
		<ul>
			{
				tasksForTodolist.map(t => {
					return <Task key={t.id} taskId={t.id} todolistId={id} />
				})
			}
		</ul>
		<div>
			<Button variant={filter === 'all' ? "contained" : "outlined"}
					color="success" onClick={onAllClickHandler} >All</Button>
			<Button variant={filter === 'active' ? "contained" : "outlined"}
					color="primary" onClick={onActiveClickHandler}>Active</Button>
			<Button variant={filter === 'completed' ? "contained" : "outlined"}
					color="secondary" onClick={onCompletedClickHandler}>Completed</Button>
		</div>
	</div>
})

*/
