import React, {useCallback, useEffect} from 'react';
import {AddItemBtn} from "../../components/addItemBtn/AddItemBtn";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../app/store";
import {createTodolistTC, setTodolistsTC, TodolistDomainType} from "./todolistsReducer";
import {TaskType} from "../../api/TodolistsApi";
import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist";
import {Navigate} from "react-router-dom";

export type TasksStateType = {
	[key: string ]:TaskType[]
}

export const TodolistsList =  () => {

	const dispatch = useAppDispatch()
	const todolists = useSelector<AppRootStateType,TodolistDomainType[]>(state => state.todolists)
	const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

	useEffect(() => {
		isLoggedIn && dispatch(setTodolistsTC())
	}, [dispatch, isLoggedIn])


	const addTodolist = useCallback((title:string) => {
		dispatch(createTodolistTC(title))
	}, [dispatch])

	if (!isLoggedIn) {
		return <Navigate to="/login"/>
	}

    return<>
		<Grid container  style={{padding: "20px"}}>
			<AddItemBtn callBackAddTask={addTodolist} />
		</Grid>
		<Grid container spacing={3}>
			{todolists.map(tl => {
				return <Grid key={tl.id} item>
					<Paper elevation={4} style={{padding: "10px"}}>
						<Todolist key={tl.id} id={tl.id}/>
					</Paper>
				</Grid>
			})}
		</Grid>
	</>
}
