import React, {useState} from 'react';
import './App.css';
import Todolist from "./Components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./Components/AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


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

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todolists, setTodolists] = useState<Array<ToDolistType>>([
        {id: todolistID1, title: "todolist1", filter: "all"},
        {id: todolistID2, title: "todolist2", filter: "all"},

    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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
        const newTask: TaskType = {id: v1(), title, isDone: false}

        setTasks({...tasks, [id]: [newTask, ...tasks[id],]})

    }

    const removeTask = (id: string, idTD: string) => {
        setTasks({...tasks, [idTD]: tasks[idTD].filter(t => t.id !== id)})
    }
    const changeFilter = (id: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(td => td.id === id ? {...td, filter} : td))
    }
    const changeStatus = (taskId: string, status: boolean, todolistID: string) => {

        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone: status} : t)})
    }
    const removeTodolist = (toDolistID: string) => {
        setTodolists(todolists.filter(t => t.id !== toDolistID))
        const {[toDolistID]: [], ...newTasks} = tasks
        setTasks(newTasks)
        setTimeout(() => console.log(tasks), 3000)
    }
    const addTodoList = (title: string) => {
        let newID = v1()
        setTodolists([{id: newID, title, filter: "all"}, ...todolists])
        setTasks({[newID]: [], ...tasks})
    }

    const changeTaskTitle = (title: string, todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, title: title} : t)})

        console.log(title, todolistID)
    }

    const changeTodolistTitle = (title: string, todolistID: string) => {
        console.log(title, todolistID)
        setTodolists(todolists.map(t => t.id === todolistID ? {...t, title} : t))
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

export default App;
