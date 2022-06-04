import React from 'react';
import { BsCheckSquareFill, BsSquare } from "react-icons/bs";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";

const data = [
    {
        pro_id: 1,
        pro_project: "Project ABC",
        pro_date_created: new Date(),
        tasks:[
        {
            tas_id: 1,
            tas_description: "Create the front-end",
            tas_date_created: new Date(),
            tas_date_finished: new Date(),
        },
        {
            tas_id: 2,
            tas_description: "Create the Page 1",
            tas_date_created: new Date(),
            tas_date_finished: null,
        },
        {
            tas_id: 3,
            tas_description: "Create the autenthication",
            tas_date_created: new Date(),
            tas_date_finished: new Date(),
        },
        ]
    },
    {
        pro_id: 2,
        pro_project: "Project XYZ",
        pro_date_created: new Date(),
        tasks:[
        {
            tas_id: 4,
            tas_description: "Create the Form",
            tas_date_created: new Date(),
            tas_date_finished: null,
        },
        {
            tas_id: 5,
            tas_description: "Create the Back-end",
            tas_date_created: new Date(),
            tas_date_finished: new Date(),
        },
        {
            tas_id: 6,
            tas_description: "Create the Data Base",
            tas_date_created: new Date(),
            tas_date_finished: null,
        },
        {
            tas_id: 7,
            tas_description: "Create the Layout",
            tas_date_created: new Date(),
            tas_date_finished: null,
        },
        ]
    }   
];

export const ListProject = () => {
    return (
        <article className="listProjects" >
        {
            data.map((project) =>{

                const toDo = project.tasks.filter((task) => task.tas_date_finished === null);
                const done = project.tasks.filter((task) => task.tas_date_finished !== null);

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
