import { Test, TestingModule } from '@nestjs/testing';
import { CsvParserService } from '../csv-parser.service';
import { DumpEntity } from './dump.entity';
import * as fs from 'fs';

describe('CsvParserService', () => {
  let service: CsvParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvParserService],
    }).compile();

    service = module.get<CsvParserService>(CsvParserService);
  });

  describe('parsing with valid data', () => {
    it('should return list of 2', async () => {
      const stream = fs.createReadStream(__dirname + '/files/simple.csv');
      const entities = await service.parse(stream, DumpEntity);

      expect(entities.list.length).toBe(2);
      expect(entities.total).toBe(2);
    });
  });
});
