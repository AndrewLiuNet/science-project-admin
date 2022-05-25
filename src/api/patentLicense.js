import request from '@/utils/request'

// 专利授权
export function getLicensingList(data) {
  return request({
    url: '/api/yb_Licensing/GetLicensList',
    method: 'post',
    data
  })
}
// 专利类型下拉列表
export function getLicensingType(data) {
  return request({
    url: '/api/yb_Licensing/getLinTypeList',
    method: 'post',
    data
  })
}
// 删除
export function deleteLicensing(data) {
  return request({
    url: '/api/yb_Licensing/DelLicensingById',
    method: 'post',
    data
  })
}
// 添加
export function addLicensing(data) {
  return request({
    url: '/api/yb_Licensing/AddLicensing',
    method: 'post',
    data
  })
}
// 修改
export function editLicensing(data) {
  return request({
    url: '/api/yb_Licensing/EditPublishedById',
    method: 'post',
    data
  })
}
