import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {TaskType} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListsType = { id: string, title: string, filter: FilterValuesType }

type TasksType={
    [key:string]:TaskType[]
}

function App() {

    let todoListsID1 = v1()
    let todoListsID2 = v1()
    let todoListsID3 = v1()
    let todoListsID4 = v1()


    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListsID1, title: "Whats to learn", filter: "all"},
        {id: todoListsID2, title: "Whats to buy", filter: "all"},
        {id: todoListsID3, title: "Whats to buy 3", filter: "all"},
        {id: todoListsID4, title: "Whats to buy 4", filter: "all"},
    ])
    let [tasks, setTasks] = useState<TasksType>({
        [todoListsID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListsID2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListsID3]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListsID4]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
    });

    let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(todolistId: string, taskId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(e => e.id !== taskId)})
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(todolistId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(todolistId: string, taskId: string, newIsDone: boolean) {

        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ?{...el,isDone:newIsDone}: el)})


        // let task = tasks[todolistId].find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        //     setTasks({...tasks});
        // }


        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
    }


    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }

    function removeTodolist(todolistID:string) {
        setTodoLists(todoLists.filter(t=>t.id!==todolistID))
        delete tasks[todolistID]
        console.log(tasks)

    }

    return (
        <div className="App">

            {todoLists.map(tl => {
                let tasksForTodolist = tasks[tl.id];

                if (tl.filter === "active") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}


        </div>
    );
}

export default App;
