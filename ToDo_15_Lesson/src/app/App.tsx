import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'

// You can learn about the difference by reading this guide on minimizing bundle size.
// https://mui.com/guides/minimizing-bundle-size/
// import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {CircularProgress, LinearProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logOutTC, meTC} from "../features/Login/auth-reducer";
import {clearStateAC} from "../features/TodolistsList/todolists-reducer";

function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state => state.auth.isLoggedIn)

    const logout = () =>{
        dispatch(logOutTC())
        dispatch(clearStateAC())
    }

    useEffect(() => {
        console.log('use effect APP')
        dispatch(meTC())

    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>


            <div className="App">
                <AppBar position="static">
                    {/*{ error && <ErrorSnackbar />}*/}
                    <ErrorSnackbar/>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn &&<Button color="inherit" onClick={logout}>Log out</Button>  }
                    </Toolbar>
                    {status === 'loading' && <LinearProgress color="error"/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path='/' element={<TodolistsList />}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/404' element={<h1>PAGE NOT FOUND</h1>}/>
                        <Route path='*' element={<Navigate to={'/404'}/>}/>

                    </Routes>


                </Container>
            </div>
        </BrowserRouter>)
}

export default App
