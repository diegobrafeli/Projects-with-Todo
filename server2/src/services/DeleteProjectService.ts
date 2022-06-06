import { getCustomRepository } from "typeorm";
import { ProjectsRepositories } from "../respositories/ProjectsRepositories";

class DeleteProjectService {

    async execute( pro_id: string ) {

        const projectsRespository = getCustomRepository( ProjectsRepositories );

        const projectAlreadyExists = await projectsRespository.findOne(pro_id);

        if(!projectAlreadyExists){
            throw new Error("Project doesn`t exist");
        }

        const now = new Date();

        await projectsRespository.update(pro_id, { pro_deleted_at : now})

        return {
            pro_id,
            "satatus":"deleted",
            "date": now
        }
    }

}

export { DeleteProjectService }