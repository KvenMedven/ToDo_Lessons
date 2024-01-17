import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    toDolistId: string
    task: TaskType

}
export const Task = memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.task.id, props.toDolistId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.toDolistId);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.toDolistId);
    },[props.task.id, props.toDolistId,props.changeTaskTitle])


    return (<div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={props.task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})