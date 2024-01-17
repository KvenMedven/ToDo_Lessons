import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type ActionsType = RemoveTodoListACType | AddTodoListACType | changeTodoListTitleACType | changeTodoListFilterACType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(tl => tl.id !== action.payload.id)
        }

        case 'ADD-TODOLIST' : {

            const newTodolist: TodolistType = {
                id: action.payload.newTodoListId,
                title: action.payload.title,
                filter: 'all'
            }
            return [...state, newTodolist]

        }
        case "CHANGE-TODOLIST-TITLE" : {
            // const todolist = state.find(tl => tl.id === action.payload.id);
            // if (todolist) {
            //     // если нашёлся - изменим ему заголовок
            //     todolist.title = action.payload.title;
            //     return {...state}
            // }

            return state.map(el=>el.id===action.payload.id ? {...el,title:action.payload.title} : el )
        }

        case "CHANGE-TODOLIST-FILTER" : {
            return state.map(el=>el.id===action.payload.id ? {...el,filter:action.payload.filter} : el )
        }

        default : {
            return state;
        }

    }
}

type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>
type AddTodoListACType = ReturnType<typeof addTodoListAC>
type changeTodoListTitleACType = ReturnType<typeof changeTodoListTitleAC>
type changeTodoListFilterACType = ReturnType<typeof changeTodoListFilterAC>

export const removeTodoListAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {id}} as const
}
export const addTodoListAC = (title: string, newTodoListId: string) => {
    return {type: 'ADD-TODOLIST', payload: {title, newTodoListId}} as const
}

export const changeTodoListTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id, title}} as const
}

export const changeTodoListFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}} as const
}
