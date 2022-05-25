import request from '@/utils/request'

// 获取年份
export function getYears(data) {
  return request({
    url: '/api/yb_Year',
    method: 'post',
    data
  })
}
