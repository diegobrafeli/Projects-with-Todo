import React from 'react';
import { BsCheckSquareFill} from "react-icons/bs";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { ListTaskDo } from '../ListTaskDo';
import { TaskAdd } from '../TaskAdd';
import { useTransactions } from '../../hooks/useTransactions';
import { deleteProject } from '../../helpers/functions';
import ReactTooltip from 'react-tooltip';


export const ListProject = () => {

    const dataContext = useTransactions();
    const {
        projects, 
        setProjects,
    } = dataContext;

    const handleDeleteProject = (pro_id) => {
        deleteProject(pro_id)
        .then(({ id_deleted_project, date_deleted_project }) => {

            const projectChangedIndex = projects.findIndex((project) => project.pro_id === id_deleted_project);
            setProjects((projects)=> projects.splice(projectChangedIndex, 1))
            alert(`Project: ${projects[projectChangedIndex].pro_project}, was deleted!`)
        })
    }


    return (
       
        <article className="listProjects" >
        {
            projects.map((project) =>{
                const toDo = project.tasks.filter((task) => (task.tas_done_at === null && task.tas_deleted_at === null));
                const done = project.tasks.filter((task) => task.tas_done_at !== null && task.tas_deleted_at === null);

                return (
                    <section key={ project.pro_id }>
                        <header>
                            <h2 data-tip={ project.pro_created_at }>{ project.pro_project }</h2>
                            <div>
                                <button><FaPencilAlt /></button>
                                <button onClick={ () => handleDeleteProject( project.pro_id )}><FaRegTrashAlt/></button>
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
                                        <button className="checkTask">
                                            <BsCheckSquareFill/>
                                        </button>
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
                        <ReactTooltip />
                    </section>
                )
            })
        }
        </article>
    )
}
