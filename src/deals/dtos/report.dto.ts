import { Source } from '../deal.entity';
import ReportUnitDto from './report-unit.dto';

export default class ReportDto {
  public source: Source;

  public data: ReportUnitDto[];
}
