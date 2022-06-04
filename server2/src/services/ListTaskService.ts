import { getCustomRepository } from "typeorm";
import { TasksRepositories } from "../respositories/TasksRepositories";


class ListTaskService {

    async execute( pro_id: string) {

        const tasksRespository = getCustomRepository( TasksRepositories );
        const tasks = await tasksRespository.find({
            where: {
                tas_pro_id: pro_id
            },
           // relations:["project"]
        })
        
        return tasks

    }

}

export { ListTaskService }