import {TasksStateType, TaskType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        taskId: string
        todolistId: string
    }
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        title: string
        todolistId: string
    }
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        todolistId: string
        taskId: string
        isDone: boolean

    }
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        todolistId: string
        taskId: string
        title: string
    }
}


const initialState:TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {

    switch (action.type) {

        case 'REMOVE-TASK' : {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            let newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }

        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.isDone
                } : task)
            }
        }
        case "CHANGE-TASK-TITLE": {
            const todolistId = action.payload.todolistId
            const taskId = action.payload.taskId
            return {
                ...state,
                [todolistId]: state[todolistId].map(task => task.id === taskId ? {
                    ...task,
                    title: action.payload.title
                } : task)
            }
        }
        case 'ADD-TODOLIST' : {
            return {[action.payload.id]: [], ...state}
        }

        case 'REMOVE-TODOLIST' : {
            let stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        }

        default :
            return state
    }

}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", payload: {taskId, todolistId}}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", payload: {title, todolistId}}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", payload: {taskId, isDone, todolistId}}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", payload: {taskId, title, todolistId}}
}