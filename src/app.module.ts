import { Module } from '@nestjs/common';
import { DealsModule } from './deals/deals.module';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule} from "@nestjs/typeorm";
import {dataSourceOptions} from "../database/data-source";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    TypeOrmModule.forRoot(dataSourceOptions),
    DealsModule,
  ],
})
export class AppModule {}
