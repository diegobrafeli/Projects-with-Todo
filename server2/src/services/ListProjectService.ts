import { getCustomRepository } from "typeorm";
import { ProjectsRepositories } from "../respositories/ProjectsRepositories";

class ListProjectService {

    async execute( use_id: string) {

        const projectsRespository = getCustomRepository( ProjectsRepositories );
        const projects = await projectsRespository.find({
            where: {
                pro_use_id: use_id,
                pro_deleted_at: null
            },
            order: {pro_project: "ASC"},
            relations: ["tasks"],
        })
        
        return projects

    }

}

export { ListProjectService }