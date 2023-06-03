import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_daily_plan' })
export default class SysDailyPlan extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: true })
  @ApiProperty()
  content: string;

  @Column({ nullable: true })
  @ApiProperty()
  target: string;

  @Column({ nullable: true })
  @ApiProperty()
  priority: string;

  @Column({ name: 'completion_time', nullable: true })
  @ApiProperty()
  completion_time: string;

  @Column({ name: 'completion_degree', nullable: true })
  @ApiProperty()
  completion_degree: number;

  @Column({ name: 'user_id' })
  @ApiProperty()
  userId: number;

  @Column({ name: 'date' })
  @ApiProperty()
  date: string;
}
