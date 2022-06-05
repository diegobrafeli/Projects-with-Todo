import { verify } from "jsonwebtoken";

interface IPayload {
    exp: number
}

class CheckAuthenticateTokenService {
    async execute( token_storage : string ){

        //expiration
        const {exp} = verify( token_storage, "7599c9efa94caaaf95c2dfdfab42e292" ) as IPayload;
        
        //recover expiration
        return {
            "exp" : exp
        }

    }
}

export { CheckAuthenticateTokenService }