
import { EntityRepository, Repository } from "typeorm";
import { Project } from "../entities/Project";

@EntityRepository(Project)
class ProjectsRepositories extends Repository<Project>{}

export { ProjectsRepositories }