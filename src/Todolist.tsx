import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {filterType} from "./App";

type TaskType = {
	id:string
	title:string
	isDone:boolean
}

type PropsType = {
	title:string
	tasks:Array<TaskType>
	removeTask: (id:string)=> void
	addTask:(NewTitle:string) => void
}

export const Todolist = (props:PropsType) => {

	const [filterValue, setFilterValue] = useState<filterType>('all')
	let isDoneTrue = props.tasks;
	if (filterValue === "active") {
		isDoneTrue = props.tasks.filter(f => !f.isDone)
	}
	if (filterValue === "completed") {
		isDoneTrue = props.tasks.filter(f => f.isDone)
	}

	const [title, setTitle] = useState('');
	const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
	}

	const onCLickHandler = () => {
		props.addTask(title)
		setTitle('')
	}

	const onKeyPressHandler = (event:KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			onCLickHandler()
		}
	}

	const  filteredTasks = (value:filterType) => {
		setFilterValue(value)
	}

	const removeTask = (item:string) => {
		props.removeTask(item)
	}

	return (
		<div className="App">
			<div>
				<h3>{props.title}</h3>
				<div>
					<input value={title}  onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
					<button onClick={onCLickHandler}>+</button>
				</div>
				<ul>
					{isDoneTrue.map(item =>
						<li key={item.id}>
							<input type="checkbox" checked={item.isDone}/>
							<span>{item.title}</span>
							<button onClick={()=> removeTask(item.id)}>X</button>
						</li>
					)}
				</ul>
				<div>
					<button onClick={()=> filteredTasks('all')}>All</button>
					<button onClick={()=> filteredTasks('active')}>Active</button>
					<button onClick={()=> filteredTasks('completed')}>Completed</button>
				</div>
			</div>
		</div>
	);
}
