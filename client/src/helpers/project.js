export const getProjects = async () => {
    const url = `http://localhost:3333/tasks/list/b9470ce4-248f-43f9-a3fc-94442759e820`;

    const resp = await fetch(url);
    const data = await resp.json();

    console.log(data);
    // const pro = data.map((img) => {
    //     return {
    //         id: img.id,
    //         title: img.title,
    //         url: img.images?.downsized_medium.url,
    //     };
    // });

    // return projec;
};