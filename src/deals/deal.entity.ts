import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CsvKey } from '../csv-parser/csvkey.decorator';

export enum Source {
  INCOME = 'income',
  OTHER = 'other',
  CUSTOM_SOURCE = 'custom-source',
}

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public sum: number;

  @Column()
  public description: string;

  @Column({ type: 'enum', enum: Source, default: Source.INCOME })
  public source: Source;

  @CsvKey('date')
  @Column({ type: 'date' })
  public finishedAt: string;
}
