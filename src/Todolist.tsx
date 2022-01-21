import React from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import RemoveBtn from "./components/RemoveBtn";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";


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

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

	const removeTodolistCallBack = () => {
		props.removeTodolist(props.id)
	}

	const removeTaskCallBack = (tID:string) => props.removeTask(tID, props.id)

	const onChangeHandler = (tID:string, event:boolean) => {
		props.changeTaskStatus(tID, event, props.id);
	}

	const callBackHandler = (title:string) => {
		props.addTask(title,props.id)
	}

	const callBackHandlerForUpdateTask = (tID:string, title:string) => {
		props.changeTask(props.id,tID, title)
	}

	const callBackHandlerForUpdateTitle = (title:string) => {
		props.changeTitle(props.id, title)
	}

    return <div>
        <h3>
			<EditableSpan title = {props.title} changeTask={(title)=>callBackHandlerForUpdateTitle(title)}/>
			<RemoveBtn name={'x'} callBack={removeTodolistCallBack}/>
		</h3>
		<AddItemForm callBackAddTask={callBackHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
						<Checkbox color="primary"
								  onChange={(e )=>onChangeHandler(t.id, e.currentTarget.checked)}
								  checked={t.isDone}
						/>
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
