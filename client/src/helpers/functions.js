import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:3333',
    headers:{
        Authorization: `Bearer ${localStorage.getItem("token_todo")}`,
    }
});

const getProjects = async () => {

    return await instance.get('/projects/list/')
    .then(function (response) {
        const {data} = response;
        return data;
    })
    .catch(function (error) {
        console.error(error);
    });

};

const getTasks = async () => {

    instance.get('/tasks/list/b9470ce4-248f-43f9-a3fc-94442759e820')
    .then(function (response) {
        const {data} = response;
        console.log(data);
    })
    .catch(function (error) {
        console.error(error);
    });

};

const creteNewProject = async ( pro_project ) => {

    instance.post('/projects', {
        pro_project
    })
    .then(function (response) {
        const {data} = response;
        console.log(data);
    })
    .catch(function (error) {
        console.error(error);
    });

};

export {
    getProjects,
    getTasks,
    creteNewProject
}