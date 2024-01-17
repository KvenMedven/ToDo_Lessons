import {RESULT_CODE, todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {
    RequestStatusType,
    setAppStatusAC,
    SetAppStatusActionType,
    setErrorAC,
    SetErrorType
} from "../../app/app-reducer";
import {fetchTasksTC, FetchTasksThunkType, setTasksAC, SetTasksActionType} from "./tasks-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../app/store";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'TODOLISTS/SET-ENTITY-STATUS' : {
            return state.map(tl => tl.id === action.todolistID ? {...tl, entityStatus: action.entityStatus} : tl)
        }
        case "CLEAR-STATE": {
            return []
        }
        default:
            return state
    }
}

// actions

export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType, entitiyStatus: string) => ({
    type: 'ADD-TODOLIST',
    todolist
} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const setEntityStatusAC = (todolistID: string, entityStatus: RequestStatusType) =>
    ({type: 'TODOLISTS/SET-ENTITY-STATUS', entityStatus, todolistID} as const)
export const clearStateAC = () =>
    ({type: 'CLEAR-STATE'} as const)

// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: ThunkDispatch<AppRootStateType, string, ActionsType | SetAppStatusActionType>) => {
        // dispatch(setAppStatusAC("loading"))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC("succeeded"))
                return res.data
            })
            .then(todos => {
                todos.forEach(td=>dispatch(fetchTasksTC(td.id)))

            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(setEntityStatusAC(todolistId, 'loading'))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC("succeeded"))
            })
            .catch(error => {
                dispatch(setAppStatusAC("idle"))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC("loading"))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                    dispatch(addTodolistAC(res.data.data.item, 'disabled'))
                    dispatch(setAppStatusAC("succeeded"))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setErrorAC('Some error'))
                    }
                    dispatch(setAppStatusAC('failed'))
                }

            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(setEntityStatusAC(id, 'loading'))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setAppStatusAC("succeeded"))
                dispatch(setEntityStatusAC(id, 'idle'))
            })
    }
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type SetEntityStatusActionType = ReturnType<typeof setEntityStatusAC>;
export type ClearStateActionType = ReturnType<typeof clearStateAC>;

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | SetAppStatusActionType
    | SetEntityStatusActionType
    | SetErrorType
    | ReturnType<typeof clearStateAC>
    | SetTasksActionType


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
