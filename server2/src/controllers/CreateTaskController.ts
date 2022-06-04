import { CreateTaskService } from "../services/CreateTaskService";
import { Request, Response } from "express";

class CreateTaskController{

    async handle(request: Request, response: Response){

        const { tas_pro_id, tas_description } = request.body;
        const createTaskService = new CreateTaskService();
        const task = await createTaskService.execute({tas_pro_id, tas_description});
        return response.json( task );
        
    }
}

export { CreateTaskController }