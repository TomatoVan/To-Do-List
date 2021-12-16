import React, {useState} from 'react';
import {filterType} from "./App";

type TaskType = {
	id:number
	title:string
	isDone:boolean
}

type PropsType = {
	title:string
	tasks:Array<TaskType>
	removeTask: (id:number)=> void
}

export const Todolist = (props:PropsType) => {

	const [filterValue, setFilterValue] = useState<filterType>('All')
	let isDoneTrue = props.tasks;
	if (filterValue === "Active") {
		isDoneTrue = props.tasks.filter(f => !f.isDone)
	}
	if (filterValue === "Completed") {
		isDoneTrue = props.tasks.filter(f => f.isDone)
	}

	const  filteredTasks = (value:filterType) => {
		setFilterValue(value)
	}

	return (
		<div className="App">
			<div>
				<h3>{props.title}</h3>
				<div>
					<input/>
					<button>+</button>
				</div>
				<ul>
					{isDoneTrue.map(item =>{
						return(
						<li key={item.id}>
							<input type="checkbox" checked={item.isDone}/>
							<span>{item.title}</span>
							<button onClick={()=> props.removeTask(item.id)}>X</button>
						</li>
						);
					})}
				</ul>
				<div>
					<button onClick={()=> filteredTasks('All')}>All</button>
					<button onClick={()=> filteredTasks('Active')}>Active</button>
					<button onClick={()=> filteredTasks('Completed')}>Completed</button>
				</div>
			</div>
		</div>
	);
}
