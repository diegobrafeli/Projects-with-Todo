import { getCustomRepository } from "typeorm";
import { ProjectsRepositories } from "../respositories/ProjectsRepositories";
import { UsersRespositories } from "../respositories/UsersRepositories";

interface IProjectRequest {
    pro_use_id: string;
    pro_project: string;
}

class CreateProjectService {

    async execute({ pro_use_id, pro_project }: IProjectRequest) {

        const projectsRespository = getCustomRepository( ProjectsRepositories );
        // const usersRespository = getCustomRepository( UsersRespositories );

        if(!pro_use_id){
            throw new Error("User incorrect");
        }

        if(!pro_project){
            throw new Error("Project incorrect");
        }

        // const userAlreadyExists = await usersRespository.findOne(pro_use_id)

        // if(userAlreadyExists){
        //     throw new Error("User doesn`t exist");
        // }

        const projectAlreadyExists = await projectsRespository.findOne({
            pro_project
        })

        if(projectAlreadyExists){
            throw new Error("Project already exists");
        }

        const project = projectsRespository.create({
            pro_use_id,
            pro_project
        });

        await projectsRespository.save(project);

        return project;

    }

}

export { CreateProjectService }