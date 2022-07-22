import React, {useCallback, useEffect} from 'react';
import {AddItemBtn} from "../../components/addItemBtn/AddItemBtn";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../components/app/store";
import {createTodolistTC, setTodolistsTC, TodolistDomainType} from "./todolistsReducer";
import {TaskType} from "../../api/TodolistsApi";
import {Grid, Paper} from "@mui/material";
import {Todolist} from "./Todolist";

export type TasksStateType = {
	[key: string ]:TaskType[]
}

export const TodolistsList =  () => {

	const dispatch = useDispatch()
	const todolists = useSelector<AppRootStateType,TodolistDomainType[]>(state => state.todolists)

	useEffect(() => {
		dispatch(setTodolistsTC())
	}, [dispatch])


	const addTodolist = useCallback((title:string) => {
		// dispatch(AddTodolist(title))
		dispatch(createTodolistTC(title))
	}, [dispatch])

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
