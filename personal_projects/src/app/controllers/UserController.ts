import { Request, Response, Router } from 'express';
import User from '../entities/User';
import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/IUser';
import { emitWarning } from 'process';

const userRouter = Router();

userRouter.get('/', async (_req, res): Promise<Response> => {
    const users = await UserRepository.getUsers();
    return res.status(200).json(users);
});

userRouter.post('/', async (req: Request, res: Response): Promise<Response> => {
    try {
        // Obtenha os dados do corpo da solicitação
        const { name, email, id } = req.body;

        // Verifique se todos os campos necessários estão presentes no corpo da solicitação
        if (!name || !email || !id) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        // Chame a função do repositório para adicionar um novo usuário
        const newUser = await UserRepository.postUser();

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default userRouter;