import React, {useReducer, useState} from 'react';
import '../src/App.css';
import {Todolist} from '../src/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "../src/components/AddItemForm";
import ButtonAppBar from "../src/components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {AddTodolist, ChangeFilter, ChangeTitle, RemoveTodolist, todolistsReducer} from "../src/state/todolistsReducer";
import {AddTask, ChangeTaskStatus, ChangeTaskTitle, RemoveTask, tasksReducer} from "../src/state/tasksReducer";
import {TaskType} from "../src/components/api/TodolistsApi";

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
	[index: string ]:TaskType[]
}

function App() {

	let todolistID1 = v1();
	let todolistID2 = v1();

	let [todolists, dispatchTodolist] = useReducer(todolistsReducer,[
		{id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
		{id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
	])

	// @ts-ignore
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
		// @ts-ignore
		dispatchTasks(ChangeTaskTitle(todolistID, title, id))
	}

	function removeTodolist(id: string) {
		let action = RemoveTodolist(id)
		dispatchTodolist(action)
		// @ts-ignore
		dispatchTasks(action)
	}

	function removeTask(id: string, todolistId: string) {
		// @ts-ignore
		dispatchTasks(RemoveTask(todolistId, id))
	}

	function addTask(title: string, todolistId: string) {
		// @ts-ignore
		dispatchTasks(AddTask(todolistId, title))
	}

	const addTodolist = (title:string) => {
		let action = AddTodolist(title)
		dispatchTodolist(action)
		// @ts-ignore
		dispatchTasks(action)
	}

	function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
		// @ts-ignore
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
							tasksForTodolist = tasks[tl.id].filter((t: { isDone: any; }) => !t.isDone);
						}
						if (tl.filter === "completed") {
							tasksForTodolist = tasks[tl.id].filter((t: { isDone: any; }) => t.isDone);
						}

						return <Grid item>
							<Paper elevation={4} style={{padding: "10px"}}>
								<Todolist
									key={tl.id}
									id={tl.id}
								/*	title={tl.title}
									tasks={tasksForTodolist}
									changeFilter={changeFilter}
									addTask={addTask}
									filter={tl.filter}
									removeTodolist={removeTodolist}
									changeTitle={changeTitle}*/
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
