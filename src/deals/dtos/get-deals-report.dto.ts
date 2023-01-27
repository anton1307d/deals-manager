import { Source } from '../deal.entity';

export default class GetDealsReportDto {
  public source: Source;

  public year: number;

  public monthNumber: number;
}
