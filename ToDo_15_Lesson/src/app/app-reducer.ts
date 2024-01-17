export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetErrorType = ReturnType<typeof setErrorAC>
export type SetInitializedType = ReturnType<typeof setItitializedAC>

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED" : {
            return {...state,isInitialized: action.isInitialized}
        }
        default:
            return state
    }
}
type ActionsType = SetAppStatusActionType | SetErrorType|SetInitializedType
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setItitializedAC = (isInitialized:boolean) => ({type: 'APP/SET-INITIALIZED',isInitialized} as const)