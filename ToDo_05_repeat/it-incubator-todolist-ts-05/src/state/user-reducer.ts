export type StateType = {
    age: number
    childrenCount: number
    name: string
}
export type ActionType = {
    type: string
    payload?:{
        [key: string]: any
    }


}

export const userReducer = (state: StateType, action: ActionType) => {
    let stateCopy = {...state}
    switch (action.type) {

        case 'INCREMENT-AGE':
            stateCopy.age = stateCopy.age + 1
            return stateCopy
        case 'INCREMENT-CHILDREN-COUNT':
            stateCopy.childrenCount = stateCopy.childrenCount + 1
            return stateCopy
        case 'CHANGE-NAME':
            return {...state, name:action.payload?.newName}
            // stateCopy.name = action.payload?.newName
            // return stateCopy
        default:
            throw new Error('I don\'t understand this type')
    }
}
