import {
    AddTodolistActionType, ClearStateActionType,
    RemoveTodolistActionType,
    setEntityStatusAC, SetEntityStatusActionType,
    SetTodolistsActionType
} from './todolists-reducer'
import {
    RESULT_CODE,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {setAppStatusAC, SetAppStatusActionType, setErrorAC, SetErrorType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        case "CLEAR-STATE": {
            return {}
        }
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)


// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todolistId))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch((error)=> {throw new Error(error)})
}
export const removeTaskTC = (taskId: string, todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(setEntityStatusAC(todolistId, 'loading'))

    try {
        const res = await todolistsAPI.deleteTask(todolistId, taskId)
        if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
            const action = removeTaskAC(taskId, todolistId)
            dispatch(action)
            dispatch(setAppStatusAC("succeeded"))
            dispatch(setEntityStatusAC(todolistId, 'idle'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, (e as { message: string }))
    }

    // .then(res => {
    //     if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
    //         const action = removeTaskAC(taskId, todolistId)
    //         dispatch(action)
    //         dispatch(setAppStatusAC("succeeded"))
    //         dispatch(setEntityStatusAC(todolistId, 'idle'))
    //     } else {
    //         handleServerAppError(dispatch,res.data)
    //     }
    //
    // })
}


export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(setEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === RESULT_CODE.SUCCEEDED) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
                dispatch(setEntityStatusAC(todolistId, 'idle'))
            } else {
                handleServerAppError(dispatch, res.data)
            }

        })
        .catch((e: AxiosError<ErrorType>) => {
            handleServerNetworkError(dispatch, e)
            dispatch(setEntityStatusAC(todolistId, 'idle'))
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        dispatch(setAppStatusAC("loading"))
        dispatch(setEntityStatusAC(todolistId, 'loading'))
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
                dispatch(setAppStatusAC("succeeded"))
                dispatch(setEntityStatusAC(todolistId, 'idle'))
            })
    }

// types

type ErrorType = {
    'statusCode': 0,
    'messages': [
        {
            'message': 'string',
            'field': 'string'
        }
    ],
    'error': 'string'
}


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type FetchTasksThunkType = ReturnType<typeof fetchTasksTC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType
    | SetAppStatusActionType
    | SetErrorType
    | SetEntityStatusActionType
    | ClearStateActionType

