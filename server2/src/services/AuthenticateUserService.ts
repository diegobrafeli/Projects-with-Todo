import { getCustomRepository } from "typeorm";
import { UsersRespositories } from "../respositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"
import { Subject } from "typeorm/persistence/Subject";

interface IAuthenticateRequest{
    use_email: string;
    use_password: string;
}

class AuthenticateUserService {
    async execute({use_email, use_password} : IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRespositories);

        //checking email
        const user = await usersRepositories.findOne({
            use_email
        });

        if(!user){
            throw new Error("Email/Password incorrect");
        }

        //checking password
        const passwordMatch = await compare( use_password, user.use_password);

        if(!passwordMatch){
            throw new Error("Email/Password incorrect");
        }

        //create token
        const token = sign(
            {
                email: user.use_email
            },
            "7599c9efa94caaaf95c2dfdfab42e292",
            {
                subject: user.use_id,
                expiresIn: "1d"
            }
        );

        return token;


    }
}

export { AuthenticateUserService }