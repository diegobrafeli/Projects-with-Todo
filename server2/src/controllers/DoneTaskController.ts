import { DoneTaskService } from "../services/DoneTaskService";
import { Request, Response } from "express";

class DoneTaskController {

    async handle(request: Request, response: Response){

        const { tas_id } = request.params;
        const doneTaskService = new DoneTaskService();
        const task = await doneTaskService.execute(tas_id);
        return response.json( task );
        
    }
}

export { DoneTaskController }