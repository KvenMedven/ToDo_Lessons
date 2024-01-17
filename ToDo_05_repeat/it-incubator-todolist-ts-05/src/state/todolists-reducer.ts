import {StateType} from "./user-reducer";
import {FilterValuesType, ToDolistType} from "../AppWithRedux";
import {v1} from "uuid";

export type ActionsType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType


export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    payload: { id: string }
}
export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    payload: { title: string, id: string }
}

export type ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    payload: { id: string, title: string }
}
export type ChangeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    payload: { id: string, filter: FilterValuesType }
}

const inititalState:Array<ToDolistType> = []

export const todolistsReducer = (state: Array<ToDolistType> = inititalState, action: ActionsType): Array<ToDolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST" : {
            return state.filter(td => td.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newTask: ToDolistType = {title: action.payload.title, id: action.payload.id, filter: 'all'}
            return [newTask, ...state,]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(td => td.id === action.payload?.id ? {...td, title: action.payload?.title} : td)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(td => td.id === action.payload.id ? {...td, filter: action.payload.filter} : td)
        }
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", payload: {id: todolistId}}
}

export const AddTodolistAC = (title: string, id: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", payload: {title, id}}
}


export const ChangeTodoListTitleAC = (title: string, todolistID: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", payload: {id: todolistID, title}}
}


export const ChangeTodoListFilterAC = (filter: FilterValuesType, todolistID: string): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", payload: {filter, id: todolistID}}
}
