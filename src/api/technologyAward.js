import request from '@/utils/request'

// 科技奖励
export function getTechnologyAwardsList(data) {
  return request({
    url: '/api/yb_TechnologyAwards/GetTecAwardslist',
    method: 'post',
    data
  })
}
// 删除
export function deleteTechnologyAwards(data) {
  return request({
    url: '/api/yb_TechnologyAwards/DelTechAward',
    method: 'post',
    data
  })
}
// 添加
export function addTechnologyAwards(data) {
  return request({
    url: '/api/yb_TechnologyAwards/AddTechAward',
    method: 'post',
    data
  })
}
// 编辑
export function editTechnologyAwards(data) {
  return request({
    url: '/api/yb_TechnologyAwards/EditTechAward',
    method: 'post',
    data
  })
}
