import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type PropsType = {
    title: string
    callback:(title:string)=>void
}

const EditableSpan = (props: PropsType) => {
    const [editMode,setEditMode]=useState(false)
    const [title,setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.callback(title)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
         setTitle(e.currentTarget.value)
    }



    return editMode
            ? <TextField variant={"standard"} color={"secondary"}  value={title} autoFocus onBlur={activateViewMode} onChange={onChangeHandler} />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
}

export default EditableSpan;