import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {TaskType} from "../Todolist";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    ;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const {payload} = action
            return {
                ...state,
                [payload.todolistId]: state[payload.todolistId].filter(task => task.id !== payload.taskId)
            }
        }
        case 'ADD-TASK': {
            let newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {

            //1st way
            // let stateCopy = {...state}
            // let task = stateCopy[action.payload.todolistId].find(t => t.id === action.payload.taskId)
            // if (task) {
            //     task.isDone = action.payload.status
            // }
            // return stateCopy

            // let stateCopy = {...state}
            // stateCopy[action.payload.todolistId] =  state[action.payload.todolistId].map(t=>t.id===action.payload.taskId ? {...t,isDone:action.payload.status} : t)
            // return stateCopy

            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                        ...task,
                        isDone: action.payload.status
                    } : task)
            }
        }

        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.title
                } : t)
            }
        }
        case "ADD-TODOLIST" : {
            return {...state,
            [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST" : {
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return  stateCopy

        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string,) => {
    return {type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', payload: {title, todolistId}} as const
}

export const changeTaskStatusAC = (taskId: string, status: boolean, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {taskId, status, todolistId}} as const
}


export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {taskId, title, todolistId}} as const
}

