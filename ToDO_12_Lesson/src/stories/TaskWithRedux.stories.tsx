import type {Meta, StoryObj} from '@storybook/react';
import {TaskWithRedux} from "../TaskWithRedux";
import {initialGlobalState, ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../Todolist";


const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLIST/Task',
    component: TaskWithRedux,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],

};


export default meta;
type Story = StoryObj<typeof TaskWithRedux>;


const TaskWithReduxPresent = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    if (!task) task = {id: 'af211', title: 'default task', isDone: false}
    return <TaskWithRedux task={task} todolistId={'todolistId1'}/>

}


export const TaskWithReduxStory: Story = {
    render: () => <TaskWithReduxPresent/>
};
