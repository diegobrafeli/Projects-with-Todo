import React from 'react'
import { creteNewTask } from '../../helpers/functions';
import { useForm } from '../../hooks/useForm';

export const TaskAdd = ({ tas_pro_id, setProjects, projects }) => {

    const [ { newTask }, handleInputChange, reset ] = useForm({
        newTask: ''
    });

    const handleAddTask = (e) =>{
        e.preventDefault();
        
        if ( newTask.trim().length <= 1 ){
            return;
        }

        creteNewTask( tas_pro_id, newTask )
        .then( (currentTask) => {
            const projectChangedIndex = projects.findIndex((project) => project.pro_id === currentTask.tas_pro_id);
            const oldTasks = [...projects[projectChangedIndex].tasks];
            projects[projectChangedIndex]["tasks"] = [...oldTasks, currentTask];
            setProjects(projects);
        });


        reset();
    }

    return(
        <form onSubmit={handleAddTask} >
            <input 
                name="newTask" 
                type="text" 
                placeholder="Task" 
                autoComplete="off"
                value={ newTask }
                onChange={ handleInputChange }

            />
            <button>Add</button>
        </form>
    )
}