import React, { useEffect, useState } from 'react'
import {  BsSquare } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";

export const ListTaskDo = ({toDo, projects}) => {

    const [tasks, setTasks] = useState(toDo);

    // useEffect(()=>{
        // console.log("tasks1");
        // const index = projects.findIndex((project) => project.pro_id === toDo.tas_pro_id);
        // setTasks(projects[index].tasks);
        // setTasks(toDo);
    // },[projects]);

    // console.log("tasks2",tasks);

    if(!toDo){
        return
    }

    return (
    
        <ul>
            {
                tasks.map((task)=>{
                    return (
                        <li key={task.tas_id}>
                            <button className="checkTask"><BsSquare/></button>
                                <p>{ task.tas_description }</p>
                            <button className="deleteTask"><FaRegTrashAlt/></button>
                        </li>
                    )
                })
            }
        </ul>

    )
}
