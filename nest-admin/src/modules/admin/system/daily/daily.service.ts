import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import SysDailyPlan from 'src/entities/admin/sys-daily-plan.entity';
import { Repository } from 'typeorm';
import moment from 'moment';
import { ROOT_ROLE_ID } from '@/modules/admin/admin.constants';
import SysDailySummarize from '@/entities/admin/sys-daily-summarize.entity';

@Injectable()
export class SysDailyService {
  constructor(
    @InjectRepository(SysDailyPlan)
    private dailyPlanRepository: Repository<SysDailyPlan>,
    @InjectRepository(SysDailySummarize)
    private dailySummarizeRepository: Repository<SysDailySummarize>,
    @Inject(ROOT_ROLE_ID) private rootRoleId: number,
  ) {}

  // 获取每日日报内容
  async getSummarize(uid: number): Promise<any> {
    const date = moment().format('YYYYMMDD');
    const summarize_day = await this.dailySummarizeRepository.find({
      where: {
        date: date,
        userId: uid,
      },
    });
    const summarize_last = await this.dailySummarizeRepository
      .createQueryBuilder('summarize')
      .where('summarize.user_id = :uid', { uid })
      .andWhere('summarize.date <> :date', { date })
      .orderBy('summarize.date', 'DESC')
      .getOne();
    const summarize_today = summarize_day.length > 0 ? summarize_day[0] : null;
    return { summarize_today, summarize_last };
  }

  //保存每日日报内容
  async saveSummarize(uid: number, dto: any): Promise<any> {
    const date = moment().format('YYYYMMDD');
    // const date = '20230522';
    const summarize_log = await this.dailySummarizeRepository.find({
      where: {
        date: date as string,
        userId: uid,
      },
    });
    if (summarize_log.length > 0) {
      const summarize = await this.dailySummarizeRepository.update(
        { userId: uid, date },
        { ...dto },
      );
      return summarize;
    } else {
      const summarize = await this.dailySummarizeRepository.save({
        userId: uid,
        date,
        ...dto,
      });
      return summarize;
    }
  }

  //获取日计划数据
  async getPlan(uid: number, dto: any) {
    const plans = await this.dailyPlanRepository.find({
      where: {
        date: dto.date,
        userId: uid,
      },
    });
    return plans;
  }

  //保存每日计划
  async savePlan(uid: number, dto: any) {
    const date = dto.date;
    const plans = dto.plans.map((item) => {
      return { date, userId: uid, ...item };
    });
    await this.dailyPlanRepository.delete({ date, userId: uid });
    const res = await this.dailyPlanRepository.save(plans);
    return res;
  }
}
