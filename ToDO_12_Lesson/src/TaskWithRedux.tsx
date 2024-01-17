import Checkbox from '@mui/material/Checkbox/Checkbox'
import React, {ChangeEvent} from 'react'
import {EditableSpan} from './EditableSpan'
import {TaskType} from './Todolist'
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type TaskPropsType = {

    task: TaskType
    todolistId: string
}
export const TaskWithRedux = React.memo(({todolistId, task}: TaskPropsType) => {

    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId))
    }


    return <div key={task.id} className={task.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})
