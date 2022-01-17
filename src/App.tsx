import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
	id:string
	title:string
	filter:FilterValuesType
}

function App() {

	let todolistID1 = v1();
	let todolistID2 = v1();

	let [todolists, setTodolists] = useState<Array<TodolistsType>>([
		{id: todolistID1, title: 'What to learn', filter: 'all'},
		{id: todolistID2, title: 'What to buy', filter: 'all'},
	])

	let [tasks, setTasks] = useState({
		[todolistID1]: [
			{id: v1(), title: "HTML&CSS", isDone: true},
			{id: v1(), title: "JS", isDone: true},
			{id: v1(), title: "ReactJS", isDone: false},
			{id: v1(), title: "Rest API", isDone: false},
			{id: v1(), title: "GraphQL", isDone: false},
		],
		[todolistID2]: [
			{id: v1(), title: "HTML&CSS2", isDone: true},
			{id: v1(), title: "JS2", isDone: true},
			{id: v1(), title: "ReactJS2", isDone: false},
			{id: v1(), title: "Rest API2", isDone: false},
			{id: v1(), title: "GraphQL2", isDone: false},
		]
	});

	const changeTask = (todolistID:string,id:string, title:string) => {
		setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === id ? {...t, title: title} : t)})
	}

	const changeTitle = (id:string, title:string) => {
		setTodolists(todolists.map(tl => tl.id === id ? {...tl, title:title} : tl))
	}


	function removeTask(id: string, todolistId: string) {
		setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})
	}

	function addTask(title: string, todolistId: string) {
		let newTask = {id: v1(), title: title, isDone: false};
		setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
	}

	const addTodolist = (title:string) => {
		let newId=v1()
		let newTodolist:TodolistsType = {id: newId, title: title, filter: 'all'}
		setTodolists([newTodolist, ...todolists])
		setTasks({...tasks, [newId]: [
				{id: v1(), title: "ReactJS2", isDone: false},
				{id: v1(), title: "Rest API2", isDone: false},
				{id: v1(), title: "GraphQL2", isDone: false}
			]})
	}

	function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
		setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
	}

	function changeFilter(value: FilterValuesType, id: string) {
		setTodolists(todolists.map(t => t.id === id ? {...t, filter: value} : t))
	}


	function removeTodolist(id: string) {
		setTodolists(todolists.filter(tl => tl.id !== id))
	}

	return (
		<div className="App">
			<AddItemForm callBackAddTask={addTodolist} />
			{todolists.map(tl => {

				let tasksForTodolist = tasks[tl.id];

				if (tl.filter === "active") {
					tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
				}
				if (tl.filter === "completed") {
					tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
				}

				return (
					<Todolist
						key={tl.id}
						id={tl.id}
						title={tl.title}
						tasks={tasksForTodolist}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeStatus}
						filter={tl.filter}
						removeTodolist={removeTodolist}
						changeTask={changeTask}
						changeTitle={changeTitle}
					/>
				)
			})}
		</div>
	);
}

export default App;
