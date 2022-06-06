import React from 'react'
import {  BsSquare } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteTask, doneTask } from '../../helpers/functions';
import { useTransactions } from '../../hooks/useTransactions';

export const ListTaskDo = ({toDo}) => {

    const dataContext = useTransactions();
    const {
        projects, 
        setProjects,
    } = dataContext;

    if(!toDo){
        return
    }

    const handleDoneTask = (tas_id) => {
        doneTask(tas_id)
        .then(
            ({id_done_task, date_done_task}) => {
                const projectChangedIndex = projects.findIndex((project) => project.pro_id === toDo[0].tas_pro_id);
                const tasks = [...projects[projectChangedIndex].tasks];

                const taskChangedIndex = tasks.findIndex((task) => task.tas_id === id_done_task);

                tasks[taskChangedIndex]["tas_done_at"] = date_done_task;

                projects[projectChangedIndex]["tasks"] = [...tasks];

                setProjects([...projects]);
            }
        )
    }

    const handleDeleteTask = (tas_id) => {
        deleteTask(tas_id)
        .then(
            ({id_deleted_task, date_deleted_task}) => {
                const projectChangedIndex = projects.findIndex((project) => project.pro_id === toDo[0].tas_pro_id);
                const tasks = [...projects[projectChangedIndex].tasks];

                const taskChangedIndex = tasks.findIndex((task) => task.tas_id === id_deleted_task);

                tasks[taskChangedIndex]["tas_deleted_at"] = date_deleted_task;

                projects[projectChangedIndex]["tasks"] = [...tasks];

                setProjects([...projects]);

                alert(`Task: ${tasks[taskChangedIndex].tas_description}, was deleted!`)
            }
        )
    }

    return (
    
        <ul>
            {
                toDo.map((task)=>{
                    return (
                        <li key={task.tas_id}>
                            <button className="checkTask" onClick={() => handleDoneTask(task.tas_id)}><BsSquare/></button>
                                <p>{ task.tas_description }</p>
                            <button className="deleteTask" onClick={() => handleDeleteTask(task.tas_id)}><FaRegTrashAlt/></button>
                        </li>
                    )
                })
            }
        </ul>

    )
}
