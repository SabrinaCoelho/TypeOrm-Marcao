import "reflect-metadata"
import { DataSource } from "typeorm"
import { CreateUserTable1699200643381 } from './migrations/1699200643381-CreateUserTable';
import User from "../app/entities/User";

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: "../db/typeorm.db",
    synchronize: true,
    entities: [User],
    migrations: [CreateUserTable1699200643381],
    subscribers: [],
})
