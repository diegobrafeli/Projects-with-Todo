import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";


class AuthenticateUserController {

    async handle( request: Request, response: Response ){
        const { use_email, use_password } = request.body;

        const authenticateUserService = new AuthenticateUserService();
        const token = await authenticateUserService.execute({
            use_email,
            use_password
        });

        return response.json(token);
    }

}

export { AuthenticateUserController }