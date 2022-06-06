import React from 'react';
import { BsCheckSquareFill} from "react-icons/bs";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { ListTaskDo } from '../ListTaskDo';
import { TaskAdd } from '../TaskAdd';
import { useTransactions } from '../../hooks/useTransactions';


export const ListProject = () => {

    const dataContext = useTransactions();
    const {
        projects, 
        setProjects,
    } = dataContext;


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
                        <ListTaskDo toDo= {toDo} projects = {projects} />
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
                        < TaskAdd 
                            tas_pro_id = { project.pro_id } 
                            projects = {projects}
                            setProjects = {setProjects}
                        />
                    </footer>
                    </section>
                )
            })
        }
        </article>
    )
}
