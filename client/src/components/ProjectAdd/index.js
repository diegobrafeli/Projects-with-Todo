import React from 'react'
import { useForm } from '../../hooks/useForm';
import { useTransactions } from '../../hooks/useTransactions';

export const ProjectAdd = () => {

    const [ { newProject }, handleInputChange, reset ] = useForm({
        newProject: ''
    });

    const dataContext = useTransactions();
    const {
        creteNewProjectFunction,
    } = dataContext;

    const handleAddProject = (e) =>{
        e.preventDefault();
        
        if ( newProject.trim().length <= 1 ){
            return;
        }

        creteNewProjectFunction(newProject);

        reset();
    }

    return (
        <aside className="newProject">
            <section>
                <header>
                    <h4>Create a new project</h4>
                </header>
                <form onSubmit={ handleAddProject }>
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
