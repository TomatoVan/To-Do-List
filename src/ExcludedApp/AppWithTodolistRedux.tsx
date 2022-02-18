import React from 'react';
import '../App.css';
import {Todolist} from './TodolistRedux';
import {AddItemForm} from "../components/AddItemForm";
import ButtonAppBar from "../components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {AddTodolist, ChangeFilter, ChangeTitle, RemoveTodolist} from "../state/todolistsReducer";
import {AddTask, ChangeTaskStatus, ChangeTaskTitle, RemoveTask} from "../state/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";

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
	[key: string ]:TasksType[]
}

function App() {

	const dispatch = useDispatch()
	const todolists = useSelector<AppRootState,TodolistsType[]>(state => state.todolists)
	const tasks = useSelector<AppRootState,TasksStateType>(state => state.tasks)

	const addTodolist = (title:string) => {
		dispatch(AddTodolist(title))
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
						return <Grid item>
							<Paper elevation={4} style={{padding: "10px"}}>
							<Todolist
								key={tl.id}
								id={tl.id}
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
