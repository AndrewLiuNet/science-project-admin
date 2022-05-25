import request from '@/utils/request'

//获取举办学术会议列表
export function getAcademicActivities(data) {
  return request({
    url: '/api/yb_AcademicSeminar/GetAcaSems',
    method: 'post',
    data
  })
}
//删除
export function deleteAcademicActivities(data) {
  return request({
    url: '/api/yb_AcademicSeminar/DelAcaSem',
    method: 'post',
    data
  })
}
//添加
export function addAcademicActivities(data) {
  return request({
    url: '/api/yb_AcademicSeminar/AddAcaSem',
    method: 'post',
    data
  })
}
//修改
export function editAcademicActivities(data) {
  return request({
    url: '/api/yb_AcademicSeminar/EditTechAward',
    method: 'post',
    data
  })
}
