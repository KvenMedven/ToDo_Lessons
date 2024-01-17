import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "bdb55ce6-721b-497c-8d32-243c79025cd8"
    }
}

const instance = axios.create(
    {
        baseURL:"https://social-network.samuraijs.com/api/1.1/",
        ...settings
    }
)

export type TodolistsType = {
    id:string,
    title:string,
    addedDate:string,
    order: number
}

type CreateToDoListResponseType = {
    resultCode:number
    messages: Array<string>
    data:{
        item:TodolistsType
    }
}

type DeleteToDoListResponseType = {
    resultCode: number
    messages: Array<string>
    data:{}
}


type ResponseType<D = {}> = {
    resultCode:number
    messages:Array<string>
    data:D
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items:TaskType[]
}

export const todolistsApi = {
    getTodolists() {
        const promise = instance.get<Array<TodolistsType>>("todo-lists")
        return promise;
    },
    createToDolist(title: string) {
        const promise = instance.post<ResponseType<{item:TodolistsType}>>("todo-lists/", {title})
        return promise
    },
    deleteToDolist(todolistId: string ) {

        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`)
        return promise
    },
    updateToDolist(todolistId:string,title: string) {
        return  instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId:string){
        return   instance.get<GetTasksResponse>("todo-lists/"+todolistId+'/tasks')

    },
    deleteTask (todolistId:string,taskId:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask (todolistId:string,title:string) {
        return instance.post<ResponseType<TaskType>>('todo-lists/' + todolistId+'/tasks',{title:title})
    },
    updateTask (todolistId:string,taskId:string,model:{}) {



        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`,model)
    }
}