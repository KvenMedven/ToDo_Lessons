import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {
    console.log("Todolist called")

    let allTodolistTasks = props.tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
    }


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistID);
        props.changeFilter('all', props.todolistID);
    }, [props.addTask, props.todolistID])

    const removeTodolist = () => {
        props.removeTodolist(props.todolistID);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistID, title);
    }, [props.changeTodolistTitle, props.todolistID])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todolistID), [props.changeFilter, props.todolistID])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todolistID), [props.changeFilter, props.todolistID])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todolistID), [props.changeFilter, props.todolistID])

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            <span>ALL TASKS : {allTodolistTasks.length}</span>
            {tasksForTodolist.map(t => {

                    return <Task
                        task={t}
                        key={t.id}
                        removeTask={props.removeTask}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        toDolistId={props.todolistID}

                    />
                })
            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})

