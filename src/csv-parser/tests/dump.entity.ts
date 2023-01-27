import { CsvKey } from '../csvkey.decorator';

export class DumpEntity {
  @CsvKey('sum')
  sum: number;

  @CsvKey('desc')
  desc: string;
}
