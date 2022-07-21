import React from 'react';
import './App.css';
import ButtonAppBar from "../../features/buttonAppBar/ButtonAppBar";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import {TodolistsList} from "../Todolists/TodolistsList";


const App = () => {

	return (
		<div className="App">
			{/*<GetTodolists/>*/}
			<ButtonAppBar/>
			<LinearProgress color={"secondary"}/>
			<Container fixed >
				<TodolistsList/>
			</Container>
		</div>
	);
}

export default App;
