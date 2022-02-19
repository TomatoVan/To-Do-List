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
					return <Task taskId={t.id} key={t.id} todolistId={id} />
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
