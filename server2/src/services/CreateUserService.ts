import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs"
import { UsersRespositories } from "../respositories/UsersRepositories";

interface IUserRequest {
    use_name: string;
    use_email: string;
    use_password: string;
}

class CreateUserService {

    async execute({use_name, use_email, use_password}: IUserRequest) {

        const usersRespository = getCustomRepository( UsersRespositories );

        if(!use_email){
            throw new Error("Email incorrect");
        }

        const usersAlreadyExists = await usersRespository.findOne({
            use_email
        });

        const passwordHash = await hash( use_password, 8);

        if(usersAlreadyExists){
            throw new Error("Uses already exists");
        }

        const user = usersRespository.create({
            use_name,
            use_email,
            use_password: passwordHash,
        });

        await usersRespository.save(user);

        return user;

    }

}

export { CreateUserService }