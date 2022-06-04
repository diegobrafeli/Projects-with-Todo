import { CreateProjectService } from "../services/CreateProjectService";
import { Request, Response } from "express";

class CreateProjectController{

    async handle(request: Request, response: Response){

        const { pro_project } = request.body;
        const { user_token_id } = request
        const createProjectService = new CreateProjectService();
        const project = await createProjectService.execute({
            pro_project, 
            pro_use_id: user_token_id
        });
        return response.json( project );
        
    }
}

export { CreateProjectController }