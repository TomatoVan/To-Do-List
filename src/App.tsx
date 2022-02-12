import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {AddTodolist, ChangeFilter, ChangeTitle, RemoveTodolist} from "./state/todolistsReducer";
import {AddTask, ChangeTaskStatus, ChangeTaskTitle, RemoveTask} from "./state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

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

	/*	let todolistID1 = v1();
	let todolistID2 = v1();

	let [todolists] = useReducer(todolistsReducer,[
		{id: todolistID1, title: 'What to learn', filter: 'all'},
		{id: todolistID2, title: 'What to buy', filter: 'all'},
	])

	let [tasks] = useReducer(tasksReducer,{
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
	});*/

	const dispatch = useDispatch()
	const todolists = useSelector<AppRootState,TodolistsType[]>(state => state.todolists)
	const tasks = useSelector<AppRootState,TasksStateType >(state => state.tasks)


	const changeTitle = (id:string, title:string) => {
		dispatch(ChangeTitle(id, title))
		/*setTodolists(todolists.map(tl => tl.id === id ? {...tl, title:title} : tl))*/
	}

	const changeTask = (todolistID:string,id:string, title:string) => {
		dispatch(ChangeTaskTitle(todolistID, title, id))
	/*	setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === id ? {...t, title: title} : t)})*/
	}

	function removeTodolist(id: string) {
		let action = RemoveTodolist(id)
		dispatch(action)
		/*setTodolists(todolists.filter(tl => tl.id !== id))*/
		/*delete tasks[id]
		setTasks({...tasks})*/
	}

	function removeTask(id: string, todolistId: string) {
		dispatch(RemoveTask(todolistId, id))
		/*setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== id)})*/
	}

	function addTask(title: string, todolistId: string) {
		dispatch(AddTask(todolistId, title))
		/*let newTask = {id: v1(), title: title, isDone: false};
		setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})*/
	}

	const addTodolist = (title:string) => {
		let action = AddTodolist(title)
		dispatch(action)
		/*let newTodolist:TodolistsType = {id: newId, title: title, filter: 'all'}
		setTodolists([newTodolist, ...todolists])*/
		/*setTasks({...tasks, [newId]: []})*/
	}

	function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
		dispatch(ChangeTaskStatus(todolistId, isDone, taskId))
		/*setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})*/
	}

	function changeFilter(value: FilterValuesType, id: string) {
		dispatch(ChangeFilter(id, value))
		/*setTodolists(todolists.map(t => t.id === id ? {...t, filter: value} : t))*/
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
								removeTask={removeTask}
								changeFilter={changeFilter}
								addTask={addTask}
								changeTaskStatus={changeStatus}
								filter={tl.filter}
								removeTodolist={removeTodolist}
								changeTask={changeTask}
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
