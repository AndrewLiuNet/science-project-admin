import request from '@/utils/request'

// 基于年份和名称获取软件著作
export function getSoftwareCopyList(data) {
  return request({
    url: '/api/yb_CopyrightRegistration/GetRegList',
    method: 'post',
    data
  })
}
// 添加
export function addSoftwareCopy(data) {
  return request({
    url: '/api/yb_CopyrightRegistration/AddRegistration',
    method: 'post',
    data
  })
}
// 修改
export function editSoftwareCopy(data) {
  return request({
    url: '/api/yb_CopyrightRegistration/EditRegistration',
    method: 'post',
    data
  })
}
// 删除
export function deleteSoftwareCopy(data) {
  return request({
    url: '/api/yb_CopyrightRegistration/DelRegistrationById',
    method: 'post',
    data
  })
}
