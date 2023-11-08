import { Request, Response, Router } from 'express';
import User from '../entities/User';
import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/IUser';
import { emitWarning } from 'process';

import { AppDataSource } from '../../database/data-source';

const userRouter = Router();

userRouter.get('/', async (_req, res): Promise<any> => {
    try{
        const users = await UserRepository.getUsers(_req, res);
        return res.status(200).json(users);
    }catch(err: any){
        return res.status(err.status).json(err.msg)
    }
    
});
userRouter.get('/:id', async (_req, res): Promise<any> => {
    
    const { id } = _req.params;
    try{
        const user = await UserRepository.getUserById(id)
        return res.status(200).send(user);
    }catch(err: any){
        return res.status(err.status).json(err.msg)
    }
});
userRouter.put('/:id', async (_req, res): Promise<any> => {
    try{
        //--- APLICAR LOGICA DO ANDRE
        const { id } = _req.params;
        const { name, email } = _req.body;

        if (!name || !email ) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const userNewData = createUser(name, email);

        const user = await UserRepository.updateUserById(id, userNewData);
        return res.status(200).json(user);
    }catch(err: any){
        return res.status(err.status).json(err.msg);
    }
});

userRouter.delete("/:id", async (_req, res): Promise<any> => {

    const { id } = _req.params;
    try{
        const user = await UserRepository.destroyUser(id);
        return res.status(200).json(user);
    }catch(err: any){
        return res.status(err.status).json(err.msg);
    }
})

userRouter.post('/', async (req: Request, res: Response): Promise<any> => {
    console.log(req.body);
    try {//-----ANDRE
        // Obtenha os dados do corpo da solicitação
        const { name, email } = req.body;

        // Verifique se todos os campos necessários estão presentes no corpo da solicitação
        if (!name || !email ) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }
        const newUser = createUser(name, email);
        
        // Chame a função do repositório para adicionar um novo usuário
        
        const user = await UserRepository.postUser(newUser);
        
        return res.status(201).json(user);
    } catch (err: any) {
        return res.status(err.status).json(err.msg);
    }
});

function createUser(name: string, email: string){
    const user= new User();
    
    user.name = name;
    user.email = email;

    return user
}

export default userRouter;
