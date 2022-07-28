import React, {useEffect} from 'react';
import './App.css';
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import {TodolistsList} from "../features/Todolists/TodolistsList";
import {useAppDispatch, useAppSelector} from "./store";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {initializeApp} from "../features/Login/authReducer";
import {CircularProgress} from "@material-ui/core";
import {ButtonAppBar} from "../components/buttonAppBar/ButtonAppBar";


const App = () => {

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(initializeApp())
	}, [dispatch])

	const status = useAppSelector(state => state.app.status)
	const isInitialized = useAppSelector(state => state.auth.isInitialized)

	if (!isInitialized) {
		return <div
			style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
			<CircularProgress/>
		</div>
	}

	return (
		<div className="App">
			<ErrorSnackbar/>
			<ButtonAppBar/>
			{status === "loading" && <LinearProgress color={"secondary"}/>}
			<Container fixed >
				<Routes>
					<Route path="/To-Do-List" element={<TodolistsList/>}/>
					<Route path="/login" element={<Login/>}/>
					<Route path="/404" element={<h1 style={{textAlign: 'center'}}>404 page not found</h1>}/>
					<Route path="*" element={<Navigate to="/404"/>}/>
				{/*<TodolistsList/>
				<Login/>*/}
				</Routes>
			</Container>
		</div>
	);
}

export default App;
