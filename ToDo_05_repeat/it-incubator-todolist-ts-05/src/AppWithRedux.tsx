import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist from "./Components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./Components/AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {userReducer} from "./state/user-reducer";
import {
    AddTodolistAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type ToDolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'completed' | 'active'

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {


    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType,ToDolistType[]>(state => state.todolists)


    const changeFilter = (id: string, filter: FilterValuesType) => {
        dispatch(ChangeTodoListFilterAC(filter,id))
    }
    const removeTodolist = (toDolistID: string) => {
        dispatch(RemoveTodolistAC(toDolistID))

    }
    const addTodoList = (title: string) => {
        let action = AddTodolistAC(title,v1())
        dispatch(action)


    }


    const changeTodolistTitle = (title: string, todolistID: string) => {
        dispatch(ChangeTodoListTitleAC(title,todolistID))
    }


    // @ts-ignore
    window.tasks = tasks

    return (
        <div className={'App'}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge={"start"} color={"inherit"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Photos
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"20px 20px 20px 0"}} >
                        <AddItemForm  addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(t => {

                        return (
                            <Grid item>
                                <Paper elevation={3} style={{padding:"20px"}}>
                                    <Todolist
                                        changeTodolistTitle={changeTodolistTitle}
                                        key={t.id}
                                        title={t.title}
                                        removeTodolist={removeTodolist}
                                        changeFilter={changeFilter}
                                        filter={t.filter}
                                        todolistId={t.id}

                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}


