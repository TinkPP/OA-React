import { promises } from 'dns';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import SysDailyPlan from 'src/entities/admin/sys-daily-plan.entity';
import { Repository } from 'typeorm';
import moment from 'moment';
import { ROOT_ROLE_ID } from '@/modules/admin/admin.constants';
import { SysRoleService } from '@/modules/admin/system/role/role.service';
import { AdminWSService } from '@/modules/ws/admin-ws.service';
import { RedisService } from '@/shared/services/redis.service';
import SysDailySummarize from '@/entities/admin/sys-daily-summarize.entity';

@Injectable()
export class SysDailyService {
  constructor(
    @InjectRepository(SysDailyPlan)
    private dailyPlanRepository: Repository<SysDailyPlan>,
    @InjectRepository(SysDailySummarize)
    private dailySummarizeRepository: Repository<SysDailySummarize>,

    private redisService: RedisService,
    @Inject(ROOT_ROLE_ID) private rootRoleId: number,
    private roleService: SysRoleService,
    private adminWSService: AdminWSService,
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
}
