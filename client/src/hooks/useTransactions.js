import {createContext, useContext, useEffect, useState} from 'react'
import { getProjects, creteNewProject, getCheckToken, getLogin  } from '../helpers/functions';

const TransactionsContext = createContext({});

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
];

export function TransactionsProvider({children}) {

    const [projects, setProjects] = useState([]);
    const [token, setToken] = useState(tokenStorage);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(()=>{

        if( token ){
            getCheckToken(token, setAuthenticated)
            .then((data)=>{
                getProjects()
                .then( (data) => setProjects(data) )
            })
            .catch(
                (err) => {
                    console.error(err);
                    alert("Error Token");
                }
            );
        }

    },[token]);

    const handleLogin = () =>{

        //for change user
        localStorage.getItem('id_user_todo') !== "0" 
        ? localStorage.setItem('id_user_todo', "0")
        : localStorage.setItem('id_user_todo', "1");

        let id_user_todo = localStorage.getItem('id_user_todo');

        getLogin( users, id_user_todo)
        .then((data) => {
            localStorage.setItem('token_todo', data);
            setToken(data);
        })
        .catch(
            (err) => {
                console.error(err);
                alert("Error Login");
            }
        );

    }

    const handleLogout = () =>{
        localStorage.clear();
        setAuthenticated(false);
        setToken(null);
    }

    function creteNewProjectFunction( newProject ){

        creteNewProject( newProject )
        .then( (project) => {
            project['tasks'] = [];
            setProjects((projects)=>([...projects, project]));
        })
        .catch(
            (err) => {
                console.error(err);
                alert("It is not possible to create a Project with the same name as another.")
            }
        );

    }


    return(
        <TransactionsContext.Provider 
            value={{
                projects, 
                creteNewProjectFunction,
                token, 
                setToken,
                setProjects,
                authenticated,
                handleLogin,
                handleLogout,
                users
            }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);
    return context;
}