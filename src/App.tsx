import React, {useState} from 'react';
import './App.css';
import  {Todolist} from './Todolist';
import {v1} from "uuid";


export type filterType = 'all' | 'active' | 'completed'

function App() {
	const [tasks, setTask] = useState([
		{id:v1(), title:'HTML&CSS', isDone:true},
		{id:v1(), title:'JS', isDone:false},
		{id:v1(), title:'React', isDone:false},
		{id:v1(), title:'React API', isDone:true},
		{id:v1(), title:'GraphQL', isDone:false}
	])

	const removeTask = (id:string) => {
		setTask(tasks.filter(f => f.id !== id))
	}

	const addTask = (NewTitle:string) => {
		setTask([{id:v1(), title:NewTitle, isDone:true},...tasks])
	}

	/*const [filterValue, setFilterValue] = useState<filterType>('All')
	let isDoneTrue = tasks;
	if (filterValue === "Active") {
		isDoneTrue = tasks.filter(f => !f.isDone)
	}
	if (filterValue === "Completed") {
		isDoneTrue = tasks.filter(f => f.isDone)
	}

	const filteredTasks = (value:filterType) => {
		setFilterValue(value)
	}*/

    return (
		<div className="App">
			<Todolist title ={"What to learn"}
					  tasks = {tasks}
					  removeTask = {removeTask}
					  addTask={addTask}
			/>
		</div>

    );
}

export default App;
