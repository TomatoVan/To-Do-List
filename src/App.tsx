import React from 'react';
import './App.css';
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, LinearProgress} from "@mui/material";
import {TodolistsList} from "./TodolistsList";


const App = () => {

	return (
		<div className="App">
			{/*<GetTodolists/>*/}
			<ButtonAppBar/>
			<Container fixed >
				<TodolistsList/>
			</Container>
		</div>
	);
}

export default App;
