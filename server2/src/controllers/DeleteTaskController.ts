import { DeleteTaskService } from "../services/DeleteTaskService";
import { Request, Response } from "express";

class DeleteTaskController {

    async handle(request: Request, response: Response){

        const { tas_id } = request.params;
        const deleteTaskService = new DeleteTaskService();
        const task = await deleteTaskService.execute(tas_id);
        return response.json( task );
        
    }
}

export { DeleteTaskController }