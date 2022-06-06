import React from 'react'
import { creteNewTask } from '../../helpers/functions';
import { useForm } from '../../hooks/useForm';
import { useTransactions } from '../../hooks/useTransactions';

export const TaskAdd = ({ tas_pro_id }) => {

    const dataContext = useTransactions();
    const {
        projects, 
        setProjects,
    } = dataContext;

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
            const lastTask = oldTasks.length;
            projects[projectChangedIndex]["tasks"] = [...oldTasks, currentTask];
            const taskChanged = projects[projectChangedIndex].tasks[lastTask];
            taskChanged["tas_done_at"] = null;
            taskChanged["tas_deleted_at"] = null;
            setProjects([...projects]);
        })
        .catch(
            (err) => {
                console.error(err);
                alert("It is not possible to create a task with the same name as another in this project.")
            }
        );


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