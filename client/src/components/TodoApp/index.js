import React, { useMemo, useState } from 'react';
import { getCheckToken, getLogin } from '../../helpers/functions';
import { ListProject } from '../ListProject';
import { ProjectAdd } from '../ProjectAdd';

let tokenStorage = localStorage.getItem("token_todo");


const users = [
    {
        use_name: "Luana",
        use_email: "luana@gmail.com",
        use_password: "654321"
    },
    {
        use_name: "Diego",
        use_email: "diego@gmail.com",
        use_password: "123456"
    }
]


export const TodoApp = () => {

    const [token, setToken] = useState(tokenStorage);
    const [projects, setProjects] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);

    const checkToken = (token) => {

        if( token ){
            getCheckToken(token, setAuthenticated).then();
        }
    }

    useMemo(() => checkToken(token), [token]);

    const handleLogin = () =>{

        //for change user
        localStorage.getItem('id_user_todo') !== "0" 
        ? localStorage.setItem('id_user_todo', "0")
        : localStorage.setItem('id_user_todo', "1");

        let id_user_todo = localStorage.getItem('id_user_todo');

        getLogin( users, id_user_todo)
        .then((data) => {
            localStorage.setItem('token_todo', data);
            tokenStorage = data;
            setToken(data);
        });

    }
    
    const handleLogout = () =>{
        localStorage.clear();
        setAuthenticated(false);
        setToken(null);
    }

    const id_user_todo = localStorage.getItem('id_user_todo');
    const user_name = id_user_todo? users[id_user_todo].use_name : "";

    return (
        <>
        <header>
            <h1>EDirectinsure TODO List</h1>
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
                    <ListProject 
                        token= {token} 
                        projects = {projects}
                        setProjects = {setProjects} 
                    />
                    <ProjectAdd setProjects = {setProjects} />
                </>
            )}
        </main>
        </>
    )
}
