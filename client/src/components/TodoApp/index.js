import axios from 'axios';
import React from 'react';
import { ListProject } from '../ListProject';
import { ProjectAdd } from '../ProjectAdd';

const instance = axios.create({
    baseURL: 'http://localhost:3333',
});


export const TodoApp = () => {

    const handleLogin = () =>{

        instance.post('/login', {
            use_email: "diego@gmail.com",
            use_password: "123456"
        })
        .then(function (response) {
            const {data} = response;
            localStorage.setItem('token_todo', data);
        })
        .catch(function (error) {
        console.error(error);
        });
    }

    return (
        <>
        <header>
            <h1>EDirectinsure TODO List</h1>
            <nav ><button onClick={handleLogin}>Log in</button></nav>
        </header>
        <main>
            <ListProject />
            <ProjectAdd />
        </main>
        </>
    )
}
