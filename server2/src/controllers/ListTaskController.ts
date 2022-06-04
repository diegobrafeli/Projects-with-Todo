import {  Request, Response } from "express";
import { ListTaskService } from "../services/ListTaskService";

class ListTaskController{

    async handle(request: Request, response: Response){

        const { pro_id } = request.params;

        const listTaskService = new ListTaskService();
        const tasks = await listTaskService.execute(pro_id);

        return response.json(tasks)
        
    }
}

export { ListTaskController }