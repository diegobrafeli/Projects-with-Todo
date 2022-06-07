import React, { useState } from 'react';
import { BsCheckSquareFill} from "react-icons/bs";
import { FaPencilAlt, FaRegTrashAlt, FaCalendarAlt } from "react-icons/fa";
import { ListTaskDo } from '../ListTaskDo';
import { TaskAdd } from '../TaskAdd';
import { useTransactions } from '../../hooks/useTransactions';
import { deleteProject, parseDate } from '../../helpers/functions';
import ReactTooltip from 'react-tooltip';


export const ListProject = () => {

    const dataContext = useTransactions();
    const {
        projects, 
        setProjects,
    } = dataContext;

    //bug because react-18-------------------------------
    const [showTooltip, setShowTooltip] = useState(true);
    //bug because react-18-------------------------------

    const handleDeleteProject = (pro_id) => {
        deleteProject(pro_id)
        .then(({ id_deleted_project }) => {

            const projectChangedIndex = projects.findIndex((project) => project.pro_id === id_deleted_project);
            const projectDeleted = projects.splice(projectChangedIndex, 1);
            setProjects([...projects]);
            alert(`Project: ${projectDeleted[0].pro_project}, was deleted!`);

            //bug because react-18-------------------------------
            setShowTooltip(false);
            setTimeout(() => setShowTooltip(true), 5);
            //bug because react-18-------------------------------

        })
    }

    const handleX = () => {
        projects[0].tasks[0]['tas_description'] = 'parada';
        console.log("xh",projects);
    }
    
    return (
       <>
            <article className="listProjects" >
                
            {               
                projects.map((project) =>{
                    const toDo = project.tasks.filter((task) => (task.tas_done_at === null && task.tas_deleted_at === null));
                    const done = project.tasks.filter((task) => task.tas_done_at !== null && task.tas_deleted_at === null);

                    return (
                        
                        <section key={ project.pro_id }>

                            {
                                showTooltip && 
                                    <ReactTooltip 
                                        effect='solid' 
                                        place='top' 
                                        type='dark' 
                                        // globalEventOff='click'
                                    />
                            }

                            <header>
                                <div style={{'display':'flex', 'alignItems':'center'}}>
                                    <h2>{ project.pro_project }</h2>
                                    <button
                                        style={{margin:'0 0.5rem', display: 'flex', alignItems:'center'}} 
                                        data-tip={ 'Date: '+ parseDate(project.pro_created_at) } 
                                        //bug because react-18 --------------------
                                        onMouseLeave={() => {
                                            setShowTooltip(false);
                                            setTimeout(() => setShowTooltip(true), 5);
                                        }}
                                        onMouseEnter={() => setShowTooltip(true)}
                                        //bug because react-18 --------------------

                                        // data-event='click' 
                                        // data-event-off='dblclick'
                                        // onDoubleClick={() => {
                                        //     setShowTooltip(false);
                                        //     setTimeout(() => setShowTooltip(true), 50);
                                        // }}
                                    >
                                        <FaCalendarAlt />
                                    </button>
                                </div>

                                <div>
                                    <button
                                        data-tip={ 'Edit' } 
                                        //bug because react-18 --------------------
                                        onMouseLeave={() => {
                                            setShowTooltip(false);
                                            setTimeout(() => setShowTooltip(true), 5);
                                        }}
                                        onMouseEnter={() => setShowTooltip(true)}
                                        //bug because react-18 --------------------
                                        onClick={handleX}
                                    >
                                        <FaPencilAlt />
                                    </button>
                                    <button 
                                        onClick={ () => handleDeleteProject( project.pro_id )}
                                        data-tip={ 'Delete' } 
                                        //bug because react-18 --------------------
                                        onMouseLeave={() => {
                                            setShowTooltip(false);
                                            setTimeout(() => setShowTooltip(true), 5);
                                        }}
                                        onMouseEnter={() => setShowTooltip(true)}
                                        //bug because react-18 --------------------
                                    >
                                        <FaRegTrashAlt/>
                                    </button>
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
 
                        </section>
                    )
                })
            }
            </article>
       </>
    )
}
