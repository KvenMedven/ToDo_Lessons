import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {_SetTodolistsType, AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {

            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.todolistId];
            // const newTasks = tasks.filter(t => t.id !== action.taskId);
            // stateCopy[action.todolistId] = newTasks;
            // return stateCopy;
        }
        case 'ADD-TASK': {
            // const stateCopy = {...state}
            // const newTask: TaskType = action.task
            // const tasks = stateCopy[action.todolistId];
            // const newTasks = [newTask, ...tasks];
            // stateCopy[action.todolistId] = newTasks;
            // return stateCopy;

            return {
                ...state, [action.todolistId]: [action.task, ...state[action.todolistId]]
            }
        }
        case 'UPDATE-TASK': {
            // let todolistTasks = state[action.todolistId];
            // // найдём нужную таску:
            // let newTasksArray = todolistTasks
            //     .map(t => t.id === action.taskId ? {...t, ...action.model} : t);
            //
            // state[action.todolistId] = newTasksArray;
            return ({
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, ...action.model} : task)
            });
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => (
                stateCopy[tl.id] = []
            ))
            return stateCopy
        }
        case "SET-TASKS": {
            return {...state,[action.todolistId] : action.tasks}
        }
        default:
            return state;
    }
}
//Action Creators
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    taskId: taskId,
    todolistId: todolistId
} as const)
export const addTaskAC = (todolistId: string, task: TaskType) => ({type: 'ADD-TASK', todolistId, task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainModelType, todolistId: string) => ({
    type: 'UPDATE-TASK',
    model,
    todolistId,
    taskId
} as const)
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => ({
    type: 'SET-TASKS',
    todolistId,
    tasks
} as const)

//Thunks
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then((res) => {
            debugger
            dispatch(addTaskAC(todolistId, res.data.data.item))
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {


    const task = getState().tasks[todolistId].find(t => t.id === taskId)
    if (task) {
        const apiModel: UpdateTaskModelType = {
            ...{
                title: task.title,
                status: task.status,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate
            },
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                console.log(res.data.data.item)
                dispatch(updateTaskAC(taskId, res.data.data.item, todolistId))
            })
    } else throw new Error('task is not defined')


}

//types
type UpdateDomainModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | ReturnType<typeof setTasksAC>
    | _SetTodolistsType
