import { DataSource } from "typeorm";
import { env } from "../config";
import { TenantEntity } from "../entities/tenant.entity";
import { UserEntity } from "../entities/user.entity";

export const dataSource: DataSource = new DataSource({
    type: "postgres",
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    synchronize: env.DB_SYNCHRONIZE || false,
    entities: [
        TenantEntity, UserEntity
    ],
})