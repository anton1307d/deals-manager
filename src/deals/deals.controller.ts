import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvParserService } from '../csv-parser/csv-parser.service';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { csvFileFilter, editFileName } from '../utils/file-upload.utils';
import { ParsedData } from '../csv-parser/parsed-data.interface';
import { DealsService } from './deals.service';
import CreateDealDto from './create-deal.dto';

@Controller('deals')
export class DealsController {
  constructor(
    private readonly csvParserService: CsvParserService,
    private readonly dealsService: DealsService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: csvFileFilter,
    }),
  )
  async export(@UploadedFile() file: Express.Multer.File) {
    const filePath = file.destination + '/' + file.filename;

    const stream = fs.createReadStream(filePath);

    const entities: ParsedData<CreateDealDto> =
      await this.csvParserService.parse(stream, CreateDealDto);

    await fs.unlink(filePath, (err) => {
      if (err) console.error(err);
    });

    return await this.dealsService.saveAll(entities.list);
  }
}
