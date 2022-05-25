import request from '@/utils/request'

// 咨询报告
export function getConsultingReportList(data) {
  return request({
    url: '/api/yb_ConsultingReport/GetRegList',
    method: 'post',
    data
  })
}
// 删除
export function deleteConsultingReport(data) {
  return request({
    url: '/api/yb_ConsultingReport/DelConsultingReportById',
    method: 'post',
    data
  })
}
// 添加
export function addConsultingReport(data) {
  return request({
    url: '/api/yb_ConsultingReport/AddConsultingReport',
    method: 'post',
    data
  })
}
// 修改
export function editConsultingReport(data) {
  return request({
    url: '/api/yb_ConsultingReport/EditRegistration',
    method: 'post',
    data
  })
}
