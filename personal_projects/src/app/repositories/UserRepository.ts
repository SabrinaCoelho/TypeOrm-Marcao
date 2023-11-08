import User from "../entities/User";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";

const userRepository = AppDataSource.getRepository(User);

const getUsers = async(_req: any, res: any): Promise<IUser[]> => {
    //return userRepository.find();
    const users = await AppDataSource.getRepository(User).find()
    return res.status(200).json(users);
}

const postUser = (u: User) => {
    return userRepository.create(u);
}

const getUserById = (user: User) => {
    return userRepository.create(user);
}

const updateUserById = (user: User) => {
    return userRepository.create(user);
}
const destroyUser = (user: User) => {
    return userRepository.create(user);
}

export default { getUsers, postUser };
