import React from 'react';
import './App.css';
import ButtonAppBar from "../../features/buttonAppBar/ButtonAppBar";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import {TodolistsList} from "../Todolists/TodolistsList";
import {useAppSelector} from "../../state/store";


const App = () => {

	const status = useAppSelector(state => state.app.status)

	return (
		<div className="App">
			<ButtonAppBar/>
			{status === "loading" && <LinearProgress color={"secondary"}/>}
			<Container fixed >
				<TodolistsList/>
			</Container>
		</div>
	);
}

export default App;
