import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CreateDealDto from './create-deal.dto';
import { plainToClass } from 'class-transformer';
import {Deal} from "./entities/deal.entity";
import GetDealsReportDto from "./dtos/get-deals-report.dto";
import ReportDto from "./dtos/report.dto";

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private dealRepository: Repository<Deal>,
  ) {}

  public async saveAll(dealsData: CreateDealDto[]): Promise<Deal[]> {
    const result = await this.dealRepository.insert(
      this.mapToEntity(dealsData),
    );

    const ids = [];

    result.identifiers.forEach((result) => {
      ids.push(result['id']);
    });

    return await this.dealRepository.findBy({
      id: In(ids),
    });
  }

  public async report(data: GetDealsReportDto): Promise<ReportDto> {
    const result = await this.dealRepository
        .createQueryBuilder()
        .select('sum("sum") as total')
        .where('source = :source', { source: data.source })
        .andWhere(
            `EXTRACT('month' from "finishedAt" ) = :month and extract('year' from "finishedAt") = :year`,
            { month: data.monthNumber, year: data.year },
        )
        .execute();

    const report = new ReportDto();

    report.source = data.source;

    report.data = [
      {
        total: result[0]?.total ?? 0,
        date: `${data.year}-${data.monthNumber}`,
      },
    ];

    return report;
  }

  private mapToEntity(dealsData: CreateDealDto[]): Deal[] {
    const deals: Deal[] = [];

    dealsData.forEach((item) => {
      const data = { ...item };
      deals.push(plainToClass(Deal, data));
    });

    return deals;
  }
}
