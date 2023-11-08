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
        return users;
    }catch(err){
        return res.status(500).json({"msg": "Erro ao buscar usuarios."})
    }
    
    /* const users = await AppDataSource.getRepository(User).find()
    return res.status(200).json(users); */
});
userRouter.get('/:id', async (_req, res): Promise<Response> => {
    //--- APLICAR LOGICA DO ANDRE
    const results = await AppDataSource.getRepository(User).findOneBy({
        id: parseInt(_req.params.id),
    })
    return res.send(results)
});
userRouter.put('/:id', async (_req, res): Promise<Response> => {
    //--- APLICAR LOGICA DO ANDRE

    //Verifica existência para edição
    const user = await AppDataSource.getRepository(User).findOneBy({
        id: parseInt(_req.params.id),
    })
    AppDataSource.getRepository(User).merge(user!, _req.body)
    const results = await AppDataSource.getRepository(User).save(user!)
    return res.send(results)
});

userRouter.delete("/:id", async function (req: Request, res: Response) {
    const results = await AppDataSource.getRepository(User).delete(req.params.id)
    return res.send(results)
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
        
        //const newUser = await UserRepository.postUser(u);
        const userFounded = await AppDataSource.getRepository(User).create(newUser)
        const results = await AppDataSource.getRepository(User).save(newUser)
        return res.send(results)
        //return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

function createUser(name: string, email: string){
    const user= new User();
    
    user.name = name;
    user.email = email;

    return user
}

export default userRouter;
