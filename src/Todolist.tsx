import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import RemoveBtn from "./components/RemoveBtn";

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

	const removeTodolistCallback = () => {
		props.removeTodolist(props.id)
	}

	const onClickHandler = (tID:string) => props.removeTask(tID, props.id)

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
			<RemoveBtn name={'x'} callBack={removeTodolistCallback}/>
		</h3>
		<AddItemForm callBackAddTask={callBackHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={(e: ChangeEvent<HTMLInputElement>)=>onChangeHandler(t.id, e.currentTarget.checked)}
                               checked={t.isDone}/>
                        {/*<span>{t.title}</span>*/}
						<EditableSpan title = {t.title} changeTask={(title)=>callBackHandlerForUpdateTask(t.id, title)}/>
                        <RemoveBtn name={'x'} callBack={() =>onClickHandler(t.id)}/>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
