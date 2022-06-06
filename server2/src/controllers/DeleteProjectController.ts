import { DeleteProjectService } from "../services/DeleteProjectService";
import { Request, Response } from "express";

class DeleteProjectController{

    async handle(request: Request, response: Response){

        const { pro_id } = request.params;
        const deleteProjectService = new DeleteProjectService();
        const project = await deleteProjectService.execute(pro_id);
        return response.json( project );
        
    }
}

export { DeleteProjectController }