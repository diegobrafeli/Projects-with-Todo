import { CreateUserService } from "../services/CreateUserService";
import { Request, Response } from "express";

class CreateUserController{

    async handle(request: Request, response: Response){

        const { use_name, use_email, use_password } = request.body;
        const createUserService = new CreateUserService();
        const user = await createUserService.execute({use_name, use_email, use_password});
        return response.json( user );
        
    }
}

export { CreateUserController }