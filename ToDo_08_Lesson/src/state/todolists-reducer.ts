import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {ActionType} from "./user-reducer";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTotodlistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTotodlistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}
export type ChangeTotodlistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType =
    RemoveTodoListActionType
    | AddTotodlistActionType
    | ChangeTotodlistFilterActionType
    | ChangeTotodlistTitleActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }

        case 'ADD-TODOLIST' : {
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        }

        case 'CHANGE-TODOLIST-TITLE' : {

            const newState = [...state]
            const todolist = newState.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return newState;
        }

        case 'CHANGE-TODOLIST-FILTER' : {
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }

        default:
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTodolistAC = (todolistId:string):RemoveTodoListActionType => {
    return {type:"REMOVE-TODOLIST", id:todolistId}
}

export const AddTodolistAC = (title:string):AddTotodlistActionType => {
    return {type:"ADD-TODOLIST", title:title}
}
export const ChangeTodolistTitleAC = (id:string, title:string):ChangeTotodlistTitleActionType => {
    return {type:"CHANGE-TODOLIST-TITLE", title:title,id:id}
}

