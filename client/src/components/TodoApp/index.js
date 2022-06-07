import React from 'react';
import { ListProject } from '../ListProject';
import { ProjectAdd } from '../ProjectAdd';
import { useTransactions } from '../../hooks/useTransactions';

export const TodoApp = () => {

    const dataContext = useTransactions();
    const {
        authenticated,
        handleLogin,
        handleLogout,
        users
    } = dataContext;

    const id_user_todo = localStorage.getItem('id_user_todo');
    const user_name = id_user_todo? users[id_user_todo].use_name : "";

    return (
        <>
        <header>
            <h1>TODO List</h1>
            <nav style={{'display': 'flex'}}>
                <button 
                    style={{'color': 'green', 'border': 'none', 'background':'none'}} 
                    onClick={handleLogin}><span>( {user_name} ) </span>Log in
                </button>
                <p style={{'margin': '0 1rem'}}> / </p>
                <button 
                    style={{'color': 'red', 'border': 'none', 'background':'none'}} 
                    onClick={handleLogout}>Log out
                </button>
            </nav>
        </header>
        <main>
            { authenticated && (
                <>
                    <ListProject />
                    <ProjectAdd />
                </>
            )}
        </main>
        </>
    )
}
