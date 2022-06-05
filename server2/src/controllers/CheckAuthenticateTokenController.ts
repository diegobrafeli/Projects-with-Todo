import { Request, Response } from "express";
import { CheckAuthenticateTokenService } from "../services/CheckAuthenticateTokenService";


class CheckAuthenticateTokenController {

    async handle( request: Request, response: Response ){

        const { token_storage } = request.params;

        const checkAuthenticateTokenService = new CheckAuthenticateTokenService();
        const token = await checkAuthenticateTokenService.execute(token_storage);

        return response.json(token);
    }

}

export { CheckAuthenticateTokenController }