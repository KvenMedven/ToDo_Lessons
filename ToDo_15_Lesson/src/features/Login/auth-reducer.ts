import {Dispatch} from 'redux'
import {
    setAppStatusAC,
    SetAppStatusActionType,
    setErrorAC,
    SetErrorType,
    SetInitializedType,
    setItitializedAC
} from '../../app/app-reducer'
import {authAPI} from "../../api/todolists-api";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {LogingDataType} from "./Login";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LogingDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch,(error as {message:string}) )
    }
}
export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch,(error as {message:string}) )
    }
    finally {
        dispatch(setItitializedAC(true))
    }
}
export const logOutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(dispatch,res.data)
        }
    } catch (error) {
        handleServerNetworkError(dispatch,(error as {message:string}) )
    }
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetErrorType |SetInitializedType
