import { CsvKey } from '../../csv-parser/csvkey.decorator';
import { Source } from '../deal.entity';

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
