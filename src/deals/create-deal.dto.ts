import { Source } from './deal.entity';
import { CsvKey } from '../csv-parser/csvkey.decorator';

export default class CreateDealDto {
  @CsvKey('sum')
  public sum: number;

  @CsvKey('description')
  public description: string;

  @CsvKey('source')
  public source: Source;

  @CsvKey('date')
  public finishedAt: string;
}
