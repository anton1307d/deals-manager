
import ReportUnitDto from './report-unit.dto';
import {Source} from "../entities/source.deal";

export default class ReportDto {
  public source: Source;

  public data: ReportUnitDto[];
}
