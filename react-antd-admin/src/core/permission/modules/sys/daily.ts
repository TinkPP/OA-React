export const sysDaily = {
  //获取每日日报
  getSummarize: 'sys/daily/getSummarize',
  //保存每日日报
  saveSummarize: 'sys/daily/saveSummarize',
  //获取每日计划
  getPlan: 'sys/daily/getPlan',
  //保存每日计划
  savePlan: 'sys/daily/savePlan'
} as const;

export const values = Object.values(sysDaily);

export type SysDailyPerms = typeof values[number];

export default sysDaily;
