import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, Icon, IconButton, Input, TextField} from "@material-ui/core";
import AddCircleIcon, {AddCircle} from '@material-ui/icons';


type AddItemPropsType={
    addItem:(title: string) => void
}
const AddItemForm = (props:AddItemPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle('')
        } else setError("Error, please text value")
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addItem()
        }
    }
    return (
        <div>
            <TextField value={title}
                       variant={"standard"}
                       label={"Tasaf"}
                   onKeyDown={onKeyDownHandler}
                   onChange={onChangeInputHandler}
                   className={error ? 'error' : ''}
                       error={!!error}
            />
            <IconButton onClick={addItem}  color={"secondary"}  >
                <AddCircle/>
            </IconButton>

            {error && <div><span className={'error-message'}>{error}</span></div>}
        </div>);

}
export default AddItemForm;