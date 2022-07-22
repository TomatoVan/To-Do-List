import React from 'react';
import './App.css';
import ButtonAppBar from "../buttonAppBar/ButtonAppBar";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import {TodolistsList} from "../../features/Todolists/TodolistsList";
import {useAppSelector} from "./store";
import {ErrorSnackbar} from "../ErrorSnackbar/ErrorSnackbar";


const App = () => {

	const status = useAppSelector(state => state.app.status)

	return (
		<div className="App">
			<ButtonAppBar/>
			{status === "loading" && <LinearProgress color={"secondary"}/>}
			<Container fixed >
				<TodolistsList/>
			</Container>

			<ErrorSnackbar/>
		</div>
	);
}

export default App;
