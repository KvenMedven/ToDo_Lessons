import React, {ChangeEvent, MouseEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from "../AppWithRedux";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, Input} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {TasksStateType} from "../AppWithRedux";


type PropsType = {
    title: string
    changeFilter: (id: string, filter: FilterValuesType) => void
    filter: FilterValuesType
    todolistId: string
    removeTodolist: (toDolistID: string) => void
    changeTodolistTitle:(title:string,todolistID:string)=>void
}


const Todolist = (props: PropsType) => {
    //
    // const tasks = useSelector<AppRootStateType,Array<TaskType>>(state => state.tasks[props.todolistId])
    // const dispatch = useDispatch()


    // let allTodoListTasks = tasks
    // let tasksForTodoList = allTodoListTasks
    // if (props.filter === 'active') {
    //     tasksForTodoList = allTodoListTasks.filter(t => !t.isDone)
    // }
    //
    // if (props.filter === 'completed') {
    //     tasksForTodoList = allTodoListTasks.filter(t => t.isDone)
    // }



    const onAllClickHandler = () => {
        props.changeFilter(props.todolistId, 'all')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter(props.todolistId, 'completed')
    }

    const onActiveClickHandler = () => {
        props.changeFilter(props.todolistId, 'active')
    }
    const removeToDoListHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTask = (title: string) => {
        // dispatch(addTaskAC(title,props.todolistId))

        // props.changeFilter(props.todolistId,'all')
    }
    const changeTodolistTitle=(title:string)=>{
        props.changeTodolistTitle(title,props.todolistId)
    }


    return (
        <div>
           <EditableSpan title={props.title} callback={changeTodolistTitle}/>
            <IconButton onClick={removeToDoListHandler}>
                <Delete />
            </IconButton>
            <AddItemForm addItem={addTask}/>
            <ul>
                {/*{tasks.map(t => {*/}
                {/*    const onClickDeleteHandler = () => {*/}
                {/*        dispatch(removeTaskAC(t.id,props.todolistId))*/}
                {/*    }*/}
                {/*    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {*/}
                {/*        dispatch(changeTaskStatusAC(t.id,e.currentTarget.checked,props.todolistId))*/}
                {/*    }*/}
                {/*    const changeTitle=(title:string)=>{*/}
                {/*        dispatch(changeTaskTitleAC(t.id,title,props.todolistId))*/}
                {/*    }*/}

                {/*    return (*/}
                {/*        <li key={t.id} className={t.isDone ? 'is-done liFlex' : 'liFlex'}>*/}
                {/*            <Checkbox color={"secondary"} checked={t.isDone} onChange={changeStatusHandler}/>*/}
                {/*            <EditableSpan title={t.title}  callback={changeTitle}/>*/}
                {/*            <IconButton  onClick={onClickDeleteHandler}  color={"default"} ><Delete/></IconButton>*/}
                {/*        </li>*/}
                {/*    )*/}
                {/*})}*/}
                <li>1</li>
            </ul>

            <Button variant={props.filter==="all" ? "contained" :"text"}  onClick={onAllClickHandler}>
                All
            </Button>
            <Button variant={props.filter==="active" ? "contained" :"text"} color={"primary"} onClick={onActiveClickHandler}>
                Active
            </Button>
            <Button variant={props.filter==="completed" ? "contained" :"text"} color={"secondary"}  onClick={onCompletedClickHandler}>
                Completed
            </Button>
        </div>
    );
};

export default Todolist;