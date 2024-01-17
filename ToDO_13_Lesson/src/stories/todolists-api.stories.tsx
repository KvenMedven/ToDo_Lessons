import React, {ChangeEvent, useEffect, useState} from 'react'

import axios from "axios";
import {todolistsApi} from "../api/todolists-api";
import {v1} from "uuid";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>({name: "Dymich"})
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

        todolistsApi.getTodolists()
            .then((res) => {
                setState(res.data)
                console.log(res.data)

            })

    }, [])
    return <div>{JSON.stringify(state)} <b>ДЛИНА : {state.length}</b></div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const create = () => {
        todolistsApi.createToDolist(title)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"Title"} onChange={(event) => setTitle(event.currentTarget.value)}/>
            <button onClick={create}>
                Create
            </button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistID] = useState<string>('')
    const deleteTD = () => {
        todolistsApi.deleteToDolist(todolistId)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input onChange={(event) => setTodolistID(event.currentTarget.value)}/>
            <button onClick={deleteTD}>DeleteTD</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const update = () => {
        todolistsApi.updateToDolist(todolistId, title)
            .then((res)=>{
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"TodolistID"} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'Title'} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={update}>
                updateTitle
            </button>
        </div>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const send = () => {
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
                console.log(res.data.items)

            })

    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} onChange={(event) => setTodolistId(event.currentTarget.value)}/>
            <button onClick={send}>
                send
            </button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')


    const deleteTask = () => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)

            })

    }

    const onChangeToDoID_Handler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)

    }
    const onChangeTaskID_Handler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={onChangeToDoID_Handler}/>
            <input placeholder={"taskID"} value={taskId} onChange={onChangeTaskID_Handler}/>
            <button onClick={deleteTask}>Delete</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const createTask = () => {
        todolistsApi.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"Title"} value={taskTitle} onChange={(e)=>setTaskTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>Create Task</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('title 1')
    const [taskDescription, setDescription] = useState<string>('description 1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadLine, setDeadLine] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const createTask = () => {

        const model = {
            title: taskTitle,
            description: taskDescription,
            completed: true,
            status: status,
            priority: priority,
            startDate: '',
            deadline: ''
        }


        todolistsApi.updateTask(todolistId, taskId,model)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e)=>setTaskId(e.currentTarget.value)}/>
            <input placeholder={"TaskTitle"} value={taskTitle} onChange={(e)=>setTaskTitle(e.currentTarget.value)}/>
            <input placeholder={"TaskDescription"} value={taskDescription} onChange={(e)=>setDescription(e.currentTarget.value)}/>
            <input placeholder={"Status"} value={status} onChange={(e)=>setStatus(Number(e.currentTarget.value))}/>
            <input placeholder={"priority"} value={priority} onChange={(e)=>setPriority(Number(e.currentTarget.value))}/>
            {/*<input placeholder={"startDate"} value={startDate} onChange={(e)=>setStartDate(e.currentTarget.value)}/>*/}
            <button onClick={createTask}>Create Task</button>
        </div>
    </div>
}


