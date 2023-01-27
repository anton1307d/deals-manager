import {Source} from "../entities/source.deal";
import {IsEnum, IsInt, IsNumber, Max, Min} from "class-validator";
import {Type} from "class-transformer";

export default class GetDealsReportDto {

  @IsEnum(Source)
  public source: Source;

  @Type(() => Number)
  @IsInt()
  @Min(1900)
  public year: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(12)
  public monthNumber: number;

}
