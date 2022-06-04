import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    //get token
    const authToken = request.headers.authorization;
    //console.log(token);

    //validation token fill
    if(!authToken){
        return response.status(401).end();
    }

    const [,token] = authToken.split(" ");

    try {
        //validation token if is true
        const { sub } = verify( token, "7599c9efa94caaaf95c2dfdfab42e292" ) as IPayload;
        
        //recover user information
        request.user_token_id = sub;

        return next();
    } catch (err) {
        return response.status(401).end();
    }
    
}
