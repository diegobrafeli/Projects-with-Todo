import { Request, Response } from "express";
import { ListProjectService } from "../services/ListProjectService";

class ListProjectController{

    async handle(request: Request, response: Response){

        const { user_token_id  } = request;

        const listProjectService = new ListProjectService();
        const projects = await listProjectService.execute(user_token_id);

        return response.json(projects)
        
    }
}

export { ListProjectController }