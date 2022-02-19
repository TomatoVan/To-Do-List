import React, {useReducer, useState} from 'react';
import '../App.css';
import {Todolist} from '../Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "../components/AddItemForm";
import ButtonAppBar from "../components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {AddTodolist, ChangeFilter, ChangeTitle, RemoveTodolist, todolistsReducer} from "../state/todolistsReducer";
import {AddTask, ChangeTaskStatus, ChangeTaskTitle, RemoveTask, tasksReducer} from "../state/tasksReducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TasksType = {
	id:string,
	title:string,
	isDone:boolean
}

export type TodolistsType = {
	id:string
	title:string
	filter:FilterValuesType
}

export type TasksStateType = {
	[index: string ]:TasksType[]
}

function App() {

	let todolistID1 = v1();
	let todolistID2 = v1();

	let [todolists, dispatchTodolist] = useReducer(todolistsReducer,[
		{id: todolistID1, title: 'What to learn', filter: 'all'},
		{id: todolistID2, title: 'What to buy', filter: 'all'},
	])

	let [tasks, dispatchTasks] = useReducer(tasksReducer,{
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

	const changeTitle = (id:string, title:string) => {
		dispatchTodolist(ChangeTitle(id, title))
	}

	const changeTask = (todolistID:string,id:string, title:string) => {
		dispatchTasks(ChangeTaskTitle(todolistID, title, id))
	}

	function removeTodolist(id: string) {
		let action = RemoveTodolist(id)
		dispatchTodolist(action)
		dispatchTasks(action)
	}

	function removeTask(id: string, todolistId: string) {
		dispatchTasks(RemoveTask(todolistId, id))
	}

	function addTask(title: string, todolistId: string) {
		dispatchTasks(AddTask(todolistId, title))
	}

	const addTodolist = (title:string) => {
		let action = AddTodolist(title)
		dispatchTodolist(action)
		dispatchTasks(action)
	}

	function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
		dispatchTasks(ChangeTaskStatus(todolistId, isDone, taskId))
	}

	function changeFilter(value: FilterValuesType, id: string) {
		dispatchTodolist(ChangeFilter(id, value))
	}

	return (
		<div className="App">
			<ButtonAppBar/>
			<Container fixed >
				<Grid container  style={{padding: "20px"}}>
					<AddItemForm callBackAddTask={addTodolist} />
				</Grid>
				<Grid container spacing={3}>
					{todolists.map(tl => {

						let tasksForTodolist = tasks[tl.id];

						if (tl.filter === "active") {
							tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
						}
						if (tl.filter === "completed") {
							tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
						}

						return <Grid item>
							<Paper elevation={4} style={{padding: "10px"}}>
								<Todolist
									key={tl.id}
									id={tl.id}
									title={tl.title}
									tasks={tasksForTodolist}
									changeFilter={changeFilter}
									addTask={addTask}
									filter={tl.filter}
									removeTodolist={removeTodolist}
									changeTitle={changeTitle}
								/>
							</Paper>
						</Grid>
					})}
				</Grid>
			</Container>
		</div>
	);
}

export default App;
