import { Router } from "express";
import userRouter from "../controllers/UserController";

const routers = Router();

routers.use('/users', userRouter);
routers.use('/', (req, res) => {
    res.send("HELLO!");
});

export default routers;