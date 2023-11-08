import User from "../entities/User";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";

const userRepository = AppDataSource.getRepository(User);

const getUsers = async(_req: any, res: any): Promise<IUser[]> => {
    //return userRepository.find();
    const users = await AppDataSource.getRepository(User).find()
    if(users && users.length){
        return users;
    }else{
        throw new Error(JSON.stringify({
            status: 500,
            msg: "Erro ao buscar usuarios."
            })
        );
        
    }
}

const postUser = async(newUser: User) => {
    //return userRepository.create(u);
    const user = await AppDataSource.getRepository(User).create(newUser)
    const results = await AppDataSource.getRepository(User).save(user)
    if(results){
        return results;
    }else{
        throw new Error(JSON.stringify({
            status: 500,
            msg: "Erro ao criar usuario."
            })
        );
    }
}

const getUserById = async(id: string) => {
    //return userRepository.create(user);
    
    const results = await AppDataSource.getRepository(User).findOneBy({
        id: parseInt(id),
    })
    if(results){
        return results;
    }else{
        throw new Error(JSON.stringify({
            status: 500,
            msg: "Erro ao buscar usuario."
            })
        );
    }
}

const updateUserById = async(id: string, userNewData: User) => {
    //return userRepository.create(user);
    const userFounded = await AppDataSource.getRepository(User).findOneBy({
        id: parseInt(id),
    })
    if(userFounded){
        AppDataSource.getRepository(User).merge(userFounded, userNewData)
        const results = await AppDataSource.getRepository(User).save(userFounded)
        
        if(results){
            return results;
        }else{
            throw new Error(JSON.stringify({
                status: 500,
                msg: "Erro ao atualizar usuario."
                })
            );
        }
    }
}
const destroyUser = async (id: string) => {
    console.log(id);
    //return userRepository.create(user);
    const results = await AppDataSource.getRepository(User).delete(id)
    console.log(results);
    if(results){
        return results;
    }else{
        throw new Error(JSON.stringify({
            status: 500,
            msg: "Erro ao deletar usuario."
            })
        );
    }
}

export default { getUsers, postUser, getUserById, updateUserById, destroyUser};
