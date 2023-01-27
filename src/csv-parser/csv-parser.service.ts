import { Injectable } from '@nestjs/common';
import { ParsedData } from './parsed-data.interface';
import { plainToClass } from 'class-transformer';
import * as Stream from 'stream';
import * as csv from 'csv-parser';
import { getCsvKey } from './csvkey.decorator';

@Injectable()
export class CsvParserService {
  async parse(
    stream: Stream,
    Entity,
    count: number = null,
    offset: number = null,
    csvConfig: object = {},
  ): Promise<ParsedData<InstanceType<typeof Entity>>> {
    return new Promise((resolve, reject) => {
      let i = 0;
      let c = 0;

      const list = [];
      const errors = [];

      const pipedStream = stream.pipe(
        csv({
          strict: true,
          separator: ',',
          ...csvConfig,
        }),
      );

      pipedStream.on('data', (line) => {
        i++;

        if (count) {
          if (c >= count) {
            return;
          }

          if (offset && i - 1 < offset) {
            return;
          }

          c++;
        }

        list.push(this.processLine(line, Entity));
      });

      pipedStream.on('end', () =>
        errors.length > 0
          ? reject({ errors })
          : resolve({
              list,
              count,
              offset,
              total: i,
            }),
      );
    });
  }

  processLine(line: any, Entity): any {
    const entityInstance = new Entity();
    const plain = {};

    Object.keys(line).forEach((key: string) => {
      const remapKey = getCsvKey(entityInstance, key);

      if (!remapKey) {
        return;
      }

      if (remapKey === 'data') {
        plain[remapKey] = new Date(line[key]).toDateString();
        console.log(plain[remapKey]);
        return;
      }

      plain[remapKey] = line[key];
    });

    return plainToClass(Entity, plain);
  }
}
