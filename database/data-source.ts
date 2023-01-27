import {DataSource, DataSourceOptions} from "typeorm";
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import {Deal} from "../src/deals/entities/deal.entity";

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [Deal],
    migrations: ['dist/database/migrations/*.js'],
    migrationsRun: true,
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
