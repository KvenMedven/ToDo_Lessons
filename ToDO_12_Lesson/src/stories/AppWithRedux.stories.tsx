import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import TextField from "@mui/material/TextField/TextField";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {AddBox, Menu} from "@mui/icons-material";
import {action} from '@storybook/addon-actions'
import AppWithRedux, {FilterValuesType, TasksStateType, TodolistType} from "../AppWithRedux";
import {Provider, useDispatch, useSelector} from "react-redux";
import {AppRootStateType, store} from "../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../state/todolists-reducer";
import {Todolist} from "../Todolist";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";

const meta: Meta<typeof AppWithRedux> = {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    decorators:[ReduxStoreProviderDecorator]

};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;



export const AppWithReduxStory:Story ={
    render:()=> <AppWithRedux/>
}