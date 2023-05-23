import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiSecurity,
  ApiTags,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ADMIN_PREFIX } from '@/modules/admin/admin.constants';
import { SysDailyService } from '@/modules/admin/system/daily/daily.service';
import { AdminUser } from '@/modules/admin/core/decorators/admin-user.decorator';
import { IAdminUser } from '@/modules/admin/admin.interface';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('每日模块')
@Controller('daily')
export class SysDailyController {
  constructor(private dailyService: SysDailyService) {}

  @ApiOperation({ summary: '获取每日日报' })
  @Get('getSummarize')
  async getSummarize(@AdminUser() user: IAdminUser): Promise<any> {
    return await this.dailyService.getSummarize(user.uid);
  }

  @ApiOperation({ summary: '保存每日日报' })
  @Post('saveSummarize')
  async info(@AdminUser() user: IAdminUser, @Body() dto: any): Promise<void> {
    return await this.dailyService.saveSummarize(user.uid, dto);
  }
}
