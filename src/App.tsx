import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {createTodolistTC, setTodolistsTC, TodolistDomainType} from "./state/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./components/api/TodolistsApi";


export type TasksStateType = {
	[key: string ]:TaskType[]
}

const App = () => {

	const dispatch = useDispatch()
	const todolists = useSelector<AppRootStateType,TodolistDomainType[]>(state => state.todolists)

	useEffect(() => {
		dispatch(setTodolistsTC())
	}, [dispatch])

	
	const addTodolist = useCallback((title:string) => {
		// dispatch(AddTodolist(title))
		dispatch(createTodolistTC(title))
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
						return <Grid key={tl.id} item>
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
