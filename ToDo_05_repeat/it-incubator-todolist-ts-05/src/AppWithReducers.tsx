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

export function AppWithReducers() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer,[
        {id: todolistID1, title: "todolist1", filter: "all"},
        {id: todolistID2, title: "todolist2", filter: "all"},

    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "TS", isDone: true},
            {id: v1(), title: "REDUX", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: ".NET", isDone: false},
            {id: v1(), title: "NEXT", isDone: false},
            {id: v1(), title: "GRAPHQL", isDone: true},

        ],
    })

    const addTask = (id: string, title: string) => {
        // const newTask: TaskType = {id: v1(), title, isDone: false}
            dispatchToTasks(addTaskAC(title,id))
        // setTasks({...tasks, [id]: [newTask, ...tasks[id],]})

    }

    const removeTask = (id: string, idTD: string) => {
        dispatchToTasks(removeTaskAC(id,idTD))
    }
    const changeFilter = (id: string, filter: FilterValuesType) => {
        dispatchToTodolists(ChangeTodoListFilterAC(filter,id))
    }
    const changeStatus = (taskId: string, status: boolean, todolistID: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId,status,todolistID))
    }
    const removeTodolist = (toDolistID: string) => {
            dispatchToTodolists(RemoveTodolistAC(toDolistID))
            dispatchToTasks(RemoveTodolistAC(toDolistID))
    }
    const addTodoList = (title: string) => {
        let action = AddTodolistAC(title,v1())
        dispatchToTodolists(action)
        dispatchToTasks(action)

    }

    const changeTaskTitle = (title: string, todolistID: string, taskId: string) => {
            dispatchToTasks(changeTaskTitleAC(taskId,title,todolistID))
    }

    const changeTodolistTitle = (title: string, todolistID: string) => {
       dispatchToTodolists(ChangeTodoListTitleAC(title,todolistID))
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
                        let allTodoListTasks = tasks[t.id]
                        let tasksForTodoList = allTodoListTasks
                        if (t.filter === 'active') {
                            tasksForTodoList = allTodoListTasks.filter(t => !t.isDone)
                        }

                        if (t.filter === 'completed') {
                            tasksForTodoList = allTodoListTasks.filter(t => t.isDone)
                        }
                        return (
                            <Grid item>
                                <Paper elevation={3} style={{padding:"20px"}}>
                                    {/*<Todolist*/}
                                    {/*    changeTaskTitle={changeTaskTitle}*/}
                                    {/*    changeTodolistTitle={changeTodolistTitle}*/}
                                    {/*    key={t.id}*/}
                                    {/*    title={t.title}*/}
                                    {/*    tasks={tasksForTodoList}*/}
                                    {/*    removeTask={removeTask}*/}
                                    {/*    removeTodolist={removeTodolist}*/}
                                    {/*    changeFilter={changeFilter}*/}
                                    {/*    addTask={addTask}*/}
                                    {/*    filter={t.filter}*/}
                                    {/*    changeStatus={changeStatus}*/}
                                    {/*    todolistId={t.id}*/}

                                    {/*/>*/}

                                    {"TODOLIST SHOULD BE HERE"}
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

