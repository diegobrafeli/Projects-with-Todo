import React from 'react'
import { creteNewProject } from '../../helpers/functions';
import { useForm } from '../../hooks/useForm';

export const ProjectAdd = () => {

    const [ { newProject }, handleInputChange, reset ] = useForm({
        newProject: ''
    });

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        if ( newProject.trim().length <= 1 ){
            return;
        }

        creteNewProject( newProject );

        // const newTodo = {
        //     id: new Date().getTime(),
        //     desc: description,
        //     done: false,
        // }

        // handleAddTodo(newTodo);


        reset();
    }

    return (
        <aside className="newProject">
            <section>
                <header>
                    <h4>Create a new project</h4>
                </header>
                <form onSubmit={ handleSubmit }>
                    <input 
                        type="text" 
                        name='newProject'
                        placeholder="Project name" 
                        autoComplete="off" 
                        value={ newProject }
                        onChange={ handleInputChange }
                    />
                    <button>Create Project</button>
                </form>
            </section>
        </aside>
    )
}
