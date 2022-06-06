import React from 'react'
import {  BsSquare } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";

export const ListTaskDo = ({toDo}) => {

    if(!toDo){
        return
    }

    return (
    
        <ul>
            {
                toDo.map((task)=>{
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
