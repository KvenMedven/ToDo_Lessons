import axios from "axios";


const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {
            'API-KEY': 'bdb55ce6-721b-497c-8d32-243c79025cd8'
        }
    }
)


export const todolistsAPI = {
    getTodolists: () => {
        return instance.get<number>('todo-lists')
    },
    createTodolist: (title: string) => {
        return instance.post('todo-lists', {title: title})
    },
    deleteTodolists: (todolistId: string) => {
        return instance.delete('todo-lists/' + todolistId)

    },
    updateTodoList: (todolistID: string, title: string) => {
        return instance.put('todo-lists/' + todolistID, {title: title})
    },
    getTasks: (todolistId: string) => {
        return instance.get(`todo-lists/${todolistId}/tasks`)
    },
    creteTask: (todolistId: string, title: string) => {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title: title})

    },
    deleteTask:(todolistID:string,taskId:string)=>{
        return instance.delete(`/todo-lists/${todolistID}/tasks/${taskId}`)
    },
    updateTaskTitle:(todolistID:string,taskID:string,taskModel:{})=>{
        return instance.put(`/todo-lists/${todolistID}/tasks/${taskID}`,taskModel)
    }

}

type  TodolistType = {
    addedDate: string
    id: string
    order: number
    title:string
}