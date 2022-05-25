import request from '@/utils/request'

//大事记
export function getMems(data) {
  return request({
    url: '/api/yb_Memorabilia/GetMems',
    method: 'post',
    data
  })
}
//删除
export function deleteMems(data) {
  return request({
    url: '/api/yb_Memorabilia/DelMem',
    method: 'post',
    data
  })
}
//添加
export function addMems(data) {
  return request({
    url: '/api/yb_Memorabilia/addMem',
    method: 'post',
    data
  })
}
//编辑
export function editMems(data) {
  return request({
    url: '/api/yb_Memorabilia/EditMem',
    method: 'post',
    data
  })
}
