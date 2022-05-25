import request from '@/utils/request'

// 出版著作
export function getPublishedWorksList(data) {
  return request({
    url: '/api/yb_PublishedWorks/GetPublishedList',
    method: 'post',
    data
  })
}
// 删除
export function deletePublishedWorks(data) {
  return request({
    url: '/api/yb_PublishedWorks/DelPubworkById',
    method: 'post',
    data
  })
}
// 添加
export function addPublishedWorks(data) {
  return request({
    url: '/api/yb_PublishedWorks/AddPubwork',
    method: 'post',
    data
  })
}
// 编辑
export function editPublishedWorks(data) {
  return request({
    url: '/api/yb_PublishedWorks/EditPublishedById',
    method: 'post',
    data
  })
}
