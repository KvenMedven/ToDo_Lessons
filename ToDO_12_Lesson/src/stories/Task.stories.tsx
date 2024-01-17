import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from '../Task';
import {ChangeEvent, useState} from "react";

const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: '12wsdewfijdei', title: 'JS', isDone: false},
        todolistId: 'fgdosrg8rgjuh'
    }
};
export default meta;
type Story = StoryObj<typeof Task>;
export const TaskIsNotDoneStory: Story = {};
export const TaskIsDoneStory: Story = {

    args: {
        task: {id: '12wsdewfijdei2343', title: 'CSS', isDone: true},
    },
};

export const TaskPresentation = () => {
    const [task, setTask] = useState({id: '12da', title: "title", isDone: false})

    return <Task
        changeTaskStatus={() => {
            setTask({...task, isDone: !task.isDone})
        }}
        changeTaskTitle={(_, titled,) => {
            setTask({...task, title: titled})
        }}
        removeTask={action("remove")}
        task={task}
        todolistId={"3s12ad"}/>

}