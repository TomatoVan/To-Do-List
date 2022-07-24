import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from "@material-ui/icons/Menu";
import {useAppSelector} from "../../app/store";
import {logout} from "../../features/Login/authReducer";
import {useDispatch} from "react-redux";


export default function ButtonAppBar() {

	const dispatch = useDispatch()
	const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

	const logOutHandler = () =>  {
		dispatch(logout())
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						TodoLists
					</Typography>
					{isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Logout</Button>}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
