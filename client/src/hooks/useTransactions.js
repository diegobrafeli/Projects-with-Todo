import {createContext, useContext, useEffect, useMemo, useState} from 'react'
import { getProjects, creteNewProject, getCheckToken  } from '../helpers/functions';

const TransactionsContext = createContext(
    {}
);

let tokenStorage = localStorage.getItem("token_todo");

export function TransactionsProvider({children}) {

    const [projects, setProjects] = useState([]);
    const [token, setToken] = useState(tokenStorage);
    const [authenticated, setAuthenticated] = useState(false);

    // const checkToken = (token) => {
    //     if( token ){
    //         getCheckToken(token, setAuthenticated).then();
    //     }
    // }
    // useMemo(() => checkToken(token), [token]);

    useEffect(()=>{

        if( token ){
            getCheckToken(token, setAuthenticated)
            .then((data)=>{
                getProjects()
                .then( (data) => setProjects(data) )
            });
        }

    },[token]);

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
        });

    }


    return(
        <TransactionsContext.Provider 
            value={[
                projects, 
                creteNewProjectFunction,
                token, 
                setToken,
                authenticated,
                handleLogout
            ]}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);
    return context;
}