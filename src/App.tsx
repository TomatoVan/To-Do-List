import React, {useState} from 'react';
import './App.css';
import  {Todolist} from './Todolist';


export type filterType = 'All' | 'Active' | 'Completed'

function App() {
	const [tasks, setTask] = useState([
		{id:1, title:'HTML&CSS', isDone:true},
		{id:2, title:'JS', isDone:false},
		{id:3, title:'React', isDone:true}
	])

	const removeTask = (id:number) => {
		setTask(tasks.filter(f => f.id !== id))
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
			/>
		</div>

    );
}

export default App;
