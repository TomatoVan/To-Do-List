import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {AddTodolist, SetTodolist, setTodolistsThunk} from "./state/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {todolistsAPI} from "./components/api/TodolistsApi";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
	id:string
	title:string
	filter:FilterValuesType
}

export type TasksType = {
	id:string,
	title:string,
	isDone:boolean
}

export type TasksStateType = {
	[key: string ]:TasksType[]
}

const App = () => {

	const dispatch = useDispatch()
	const todolists = useSelector<AppRootState,TodolistsType[]>(state => state.todolists)

	useEffect(() => {
		todolistsAPI.getTodolists()
			.then(res => {
				let todos = res.data
				dispatch(SetTodolist(todos))
			})

	}, [dispatch])

	const addTodolist = useCallback((title:string) => {
		dispatch(AddTodolist(title))
	}, [dispatch])

	return (
		<div className="App">
			{/*<GetTodolists/>*/}
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
