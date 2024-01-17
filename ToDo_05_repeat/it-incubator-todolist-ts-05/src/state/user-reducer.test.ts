import {StateType, userReducer} from './user-reducer'

test("user reducer should increment only age",()=>{
    const startState:StateType = {age:1, name:"Dimych", childrenCount:2}

    const endState=userReducer(startState,{type:"INCREMENT-AGE"})

    expect(endState.age).toBe(2)
    expect(endState.childrenCount).toBe(2)
})

test("user reducer should increment only children count",()=>{
    const startState:StateType={age:3,name:"Vasya",childrenCount:4}

    const endState:StateType=userReducer(startState,{type:"INCREMENT-CHILDREN-COUNT"})

    expect(endState.name).toBe("Vasya")
    expect(endState.age).toBe(3)
    expect(endState.childrenCount).toBe(5)
})

test('user reducer should change name of user', () => {
    const startState = {name: 'Dimych', age: 20, childrenCount: 2}
    const newName = 'Viktor'
    const endState = userReducer(startState, {type: 'CHANGE-NAME',payload:{ newName: newName}})

    expect(endState.name).toBe(newName)
})
