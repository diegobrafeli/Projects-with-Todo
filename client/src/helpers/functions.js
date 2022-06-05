import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:3333'
});

const getProjects = async () => {

    instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token_todo")}`;

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

    instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token_todo")}`;

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

    instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token_todo")}`;

    return instance.post('/projects', {
        pro_project
    })
    .then(function (response) {
        const {data} = response;
        console.log("creteNewProject:",data);
        return data
    })
    .catch(function (error) {
        console.error(error);
    });

};

const getCheckToken = async (token, setAuthenticated) => {

    instance.get('/check/token/'+token)
    .then(function (response) {
        const {data} = response;

        let expire = new Date();
        expire.setTime(data.exp * 1000);
        console.log("Token expire:",expire);

        setAuthenticated(true);
    })
    .catch(function (error) {
        console.error(error);
        localStorage.removeItem('token_todo');
    });

};



export {
    getProjects,
    getTasks,
    creteNewProject,
    getCheckToken
}