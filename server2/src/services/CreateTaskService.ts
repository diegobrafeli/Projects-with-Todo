import { getCustomRepository } from "typeorm";
import { TasksRepositories } from "../respositories/TasksRepositories";
import { UsersRespositories } from "../respositories/UsersRepositories";

interface ITaskRequest {
    tas_pro_id: string;
    tas_description: string;
}

class CreateTaskService {

    async execute({ tas_pro_id, tas_description }: ITaskRequest) {

        const tasksRespository = getCustomRepository( TasksRepositories );

        if(!tas_pro_id){
            throw new Error("Task incorrect");
        }

        if(!tas_description){
            throw new Error("Description incorrect");
        }

        const tasksAlreadyExists = await tasksRespository.findOne({
            where: {
                tas_pro_id,
                tas_description
            }
        })

        if(tasksAlreadyExists){
            throw new Error("Task already exists");
        }

        const task = tasksRespository.create({
            tas_pro_id,
            tas_description
        });

        await tasksRespository.save(task);

        return task;

    }

}

export { CreateTaskService }