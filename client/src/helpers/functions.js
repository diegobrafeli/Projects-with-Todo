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

const creteNewTask = async ( tas_pro_id, tas_description ) => {

    instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token_todo")}`;

    return instance.post('/tasks', {
        tas_pro_id,
        tas_description
    })
    .then(function (response) {
        const {data} = response;
        console.log("creteNewTask:",data);
        return data
    })
    .catch(function (error) {
        console.error(error);
    });

};

const getCheckToken = async (token, setAuthenticated) => {

    return instance.get('/check/token/'+token)
    .then(function (response) {
        const {data} = response;

        let expire = new Date();
        expire.setTime(data.exp * 1000);
        console.log("Token expire:",expire);

        setAuthenticated(true);
        return true
    })
    .catch(function (error) {
        console.error(error);
        localStorage.removeItem('token_todo');
    });

};

const getLogin = async ( users, id_user_todo) => {

    instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token_todo")}`;

    return instance.post('/login', {
        use_email: users[id_user_todo].use_email,
        use_password: users[id_user_todo].use_password,
    })
    .then(function (response) {
        const {data} = response;
        return data;
        // localStorage.setItem('token_todo', data);
        // setToken(data);
    })
    .catch(function (error) {
        console.error(error);
    });
}



export {
    getProjects,
    getTasks,
    creteNewProject,
    getCheckToken,
    creteNewTask,
    getLogin
}