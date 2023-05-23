import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_daily_summarize' })
export default class SysDailySummarize extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  date: string;

  @Column({ nullable: true })
  @ApiProperty()
  summarize_one: string;

  @Column({ nullable: true })
  @ApiProperty()
  summarize_two: string;

  @Column({ nullable: true })
  @ApiProperty()
  evaluation: string;

  @Column({ name: 'user_id' })
  @ApiProperty()
  userId: number;
}
