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

// const getTasks = async () => {

//     instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token_todo")}`;

//     instance.get('/tasks/list/b9470ce4-248f-43f9-a3fc-94442759e820')
//     .then(function (response) {
//         const {data} = response;
//         console.log(data);
//     })
//     .catch(function (error) {
//         console.error(error);
//     });

// };

const doneTask = async (tas_id) => {

    instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token_todo")}`;

    return instance.put('/tasks/'+tas_id)
    .then(function (response) {
        const {data} = response;
        console.log(data);
        return {
            id_done_task: data.tas_id,
            date_done_task: data.date,
        }
    })
    .catch(function (error) {
        console.error(error);
    });

};

const deleteTask = async (tas_id) => {

    instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token_todo")}`;

    return instance.delete('/tasks/'+tas_id)
    .then(function (response) {
        const {data} = response;
        console.log(data);
        return {
            id_deleted_task: data.tas_id,
        }
    })
    .catch(function (error) {
        console.error(error);
    });

};

const deleteProject = async (pro_id) => {

    instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token_todo")}`;

    return instance.delete('/projects/'+pro_id)
    .then(function (response) {
        const {data} = response;
        console.log(data);
        return {
            id_deleted_project: data.pro_id,
            date_deleted_project: data.date,
        }
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

const parseDate = (dateLong) => {
    const date = new Date(dateLong);
    const dateParsed = new Intl.DateTimeFormat('pt-BR').format(date)
    //const dateParse = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()
    return dateParsed
}

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
        localStorage.clear();
        throw(error);
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
        throw(error);
    });
}



export {
    getProjects,
    // getTasks,
    parseDate,
    creteNewProject,
    getCheckToken,
    creteNewTask,
    getLogin,
    doneTask,
    deleteTask,
    deleteProject
}