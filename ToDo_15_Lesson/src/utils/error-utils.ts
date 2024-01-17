import {setAppStatusAC, SetAppStatusActionType, setErrorAC, SetErrorType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerAppError = <D>(dispatch:Dispatch,data:ResponseType<D>)=> {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (dispatch: Dispatch<SetErrorType |SetAppStatusActionType >, error: {message:string}) => {
    dispatch(setErrorAC(error.message? error.message:'some error occurred'))
    dispatch(setAppStatusAC('failed'))
}