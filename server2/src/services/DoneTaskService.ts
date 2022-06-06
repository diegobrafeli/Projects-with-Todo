import { getCustomRepository } from "typeorm";
import { TasksRepositories } from "../respositories/TasksRepositories";

class DoneTaskService {

    async execute( tas_id: string ) {

        const tasksRespository = getCustomRepository( TasksRepositories );

        const taskAlreadyExists = await tasksRespository.findOne(tas_id);

        if(!taskAlreadyExists){
            throw new Error("Task doesn`t exist");
        }

        const now = new Date();

        await tasksRespository.update(tas_id, { tas_done_at : now})

        return {
            tas_id,
            "satatus":"done",
            "date": now,
        }
    }

}

export { DoneTaskService }