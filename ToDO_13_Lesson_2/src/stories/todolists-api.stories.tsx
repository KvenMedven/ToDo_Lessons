import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API',

}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(0)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        todolistsAPI.getTodolists()
            .then((res) => {
                console.log(res.data)
                setState(res.data)
            })


    }, [])
    return <div>{JSON.stringify(state)}
        <div>
            <b>Длина: {state.length} </b>
        </div>
    </div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist("Created TD")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState<string>('')


    const deleteTD = () => {
        todolistsAPI.deleteTodolists(value)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input value={value} onChange={(event) => setValue(event.currentTarget.value)}/>
            <button onClick={deleteTD}>Delete</button>
        </div>
    </div>

}


export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID,setTodolistID]=useState<string>('')
    const [todolistTitle,settodolistTitle]=useState<string>('')



    const updateTask=()=> {
        todolistsAPI.updateTodoList(todolistID, todolistTitle)
            .then((res) => {
                setState(res.data)
            })

    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'TodolistId'} value={todolistID} onChange={(event)=>setTodolistID(event.currentTarget.value)}/>
            <input placeholder={'Todolist Title'} value={todolistTitle} onChange={(event)=>settodolistTitle(event.currentTarget.value)}/>
            <button onClick={updateTask}>Update TD Title</button>

        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>({})
    const [value, setValue] = useState<string>('')

    const getTasks = () => {
        todolistsAPI.getTasks(value)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>длина: {Object. keys(state).length}</div>
        <div><input value={value} onChange={(event) => setValue(event.currentTarget.value)}/>
            <button onClick={getTasks}>GetTasks</button>
        </div>

    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(0)
    const [todolistID,setTodolistID]=useState<string>('')
    const [taskTitle,settaskTitle]=useState<string>('')
    const createTask=()=>{
        todolistsAPI.creteTask(todolistID, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
            <div>
                <input placeholder={'TodolistId'} value={todolistID} onChange={(event)=>setTodolistID(event.currentTarget.value)}/>
                <input placeholder={'Task Title'} value={taskTitle} onChange={(event)=>settaskTitle(event.currentTarget.value)}/>
                <button onClick={createTask}>CreateTask</button>

            </div>
    </div>
}

export const DeleteTask = () =>{
    const [state, setState] = useState<any>(0)
    const [todolistID,setTodolistID]=useState<string>('')
    const [taskID,setTaskID]=useState<string>('')

    const deleteTask =()=>{
        // todolistsAPI.deleteTask(todolistID,taskID)
        //     .then((res)=>{
        //         setState(res.data)
        //     })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistID'} value={todolistID} onChange={(e)=>setTodolistID(e.currentTarget.value)}/>
            <input placeholder={'taskID'} value={taskID} onChange={(e)=>setTaskID(e.currentTarget.value)}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const UpdateTaskTitle = () => {

    const [state,setState] = useState<any>(0)
    const [todolistId,setTodolistId] = useState<string>('')
    const [taskId,setTaskId] = useState<string>('')
    const [title,setTitle]=useState<string>('')

    const updateTask = ()=>{
        const taskModel = {
            title: title,
            // description: '',
            // completed: false,
            // status: 2,
            // priority: 2,
            // startDate: '',
            // deadline:'',

        }
        todolistsAPI.updateTaskTitle(todolistId,taskId,taskModel)
            .then((res)=>{
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
            <div>
                <input placeholder={'todolistID'} value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
                <input placeholder={'taskId'} value={taskId} onChange={(e)=>setTaskId(e.currentTarget.value)}/>
                <input placeholder={'title'} value={title} onChange={(e)=>setTitle(e.currentTarget.value)}/>
                <button onClick={updateTask}>Update</button>
            </div>
    </div>

}