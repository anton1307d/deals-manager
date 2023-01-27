import { Module } from '@nestjs/common';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { CsvParserModule } from '../csv-parser/csv.parser.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {Deal} from "./entities/deal.entity";

@Module({
  imports: [CsvParserModule, TypeOrmModule.forFeature([Deal]), ConfigModule],
  controllers: [DealsController],
  providers: [DealsService],
})
export class DealsModule {}
