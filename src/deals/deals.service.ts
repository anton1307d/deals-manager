import { Injectable } from '@nestjs/common';
import { Deal } from './deal.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CreateDealDto from './create-deal.dto';
import { plainToClass } from 'class-transformer';

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

  private mapToEntity(dealsData: CreateDealDto[]): Deal[] {
    const deals: Deal[] = [];

    dealsData.forEach((item) => {
      const data = { ...item };
      deals.push(plainToClass(Deal, data));
    });

    return deals;
  }
}
