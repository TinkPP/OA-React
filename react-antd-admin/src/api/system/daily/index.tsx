import Api from '@/core/permission/modules/sys/daily';
import { request } from '@/utils/request';

export function getSummarize() {
  return request({
    url: Api.getSummarize,
    method: 'get'
  });
}

export function saveSummarize(data: any) {
  return request({
    url: Api.saveSummarize,
    method: 'post',
    data
  });
}

export function getPlan(data: any) {
  return request({
    url: Api.getPlan,
    method: 'post',
    data
  });
}

export function savePlan(data: any) {
  return request({
    url: Api.savePlan,
    method: 'post',
    data
  });
}
