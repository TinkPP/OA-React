import Api from '@/core/permission/modules/sys/daily';
import { request } from '@/utils/request';

export function getSummarize() {
  console.log('111');
  return request({
    url: Api.getSummarize,
    method: 'get'
  });
}

export function saveSummarize(data: any) {
  console.log('222222222222222222', data);
  return request({
    url: Api.saveSummarize,
    method: 'post',
    data
  });
}
