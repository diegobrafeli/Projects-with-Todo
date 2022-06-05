import React, { useMemo, useState } from 'react';
import { BsCheckSquareFill, BsSquare } from "react-icons/bs";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { getProjects } from '../../helpers/functions';


export const ListProject = ({token, setToken, projects, setProjects}) => {

    const listProject = (token) =>{
        getProjects()
        .then( (data) => setProjects(data) )
    }
    
    useMemo(() => listProject(token), [token]);

    return (
        
        <article className="listProjects" >
        {
            projects.map((project) =>{

                const toDo = project.tasks.filter((task) => task.tas_done_at === null);
                const done = project.tasks.filter((task) => task.tas_done_at !== null);

                return (
                    <section key={ project.pro_id }>
                    <header>
                        <h2>{ project.pro_project }</h2>
                        <div>
                        <button><FaPencilAlt /></button>
                        <button><FaRegTrashAlt/></button>
                        </div>
                    </header>
                    <div className="contentProject">
                        <h3>To Do</h3>
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
                        <h3>Done</h3>
                        <ul>
                        {
                            done.map((task)=>{
                            return (
                                <li key={ task.tas_id }>
                                <button className="checkTask"><BsCheckSquareFill/></button>
                                <p>{ task.tas_description }</p>
                                </li>
                            )
                            })
                        }
                        </ul>
                        <hr />
                    </div>
                    <footer>
                        <form action="">
                        <input name="addTask" type="text" placeholder="Task" autoComplete="off"/>
                        <button>Add</button>
                        </form>
                    </footer>
                    </section>
                )
            })
        }
        </article>
    )
}
