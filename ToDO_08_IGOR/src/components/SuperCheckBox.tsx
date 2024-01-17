import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";
import {TaskType} from "../Todolist";

type PropsType = {
    isDone:boolean
    callBack:(f:boolean)=>void

}

export const SuperCheckBox:React.FC<PropsType> = ({isDone,callBack}) => {
    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        callBack(event.currentTarget.checked);
    }
    return (
        <Checkbox
            checked={isDone}
            color="primary"
            onChange={onChangeHandler}
        />
    );
};

