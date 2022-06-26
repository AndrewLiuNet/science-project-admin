import request from '@/utils/request'

// 发表论文
export function getPaperPublicationList(data) {
  return request({
    url: '/api/yb_PaperPublication/GetPaperlist',
    method: 'post',
    data
  })
}
// 添加
export function addPaperPublication(data) {
  return request({
    url: '/api/yb_PaperPublication/AddPaper',
    method: 'post',
    data
  })
}
// 修改
export function editPaperPublication(data) {
  return request({
    url: '/api/yb_PaperPublication/EditPaperById',
    method: 'post',
    data
  })
}
// 删除
export function deletePaperPublication(data) {
  return request({
    url: '/api/yb_PaperPublication/DelPaperById',
    method: 'post',
    data
  })
}
// 1获奖成果统计 可传单位id、年份id，分页不可用
export function getAwardWinningAchievementsList(data) {
  return request({
    url: '/api/yb1_Research_Output/GetAward_Winning_AchievementsList',
    method: 'post',
    data
  })
}
// 2 授权及申请专利登记统计  
export function getPatentApplicationStatisticsList(data) {
  return request({
    url: '/api/yb1_Research_Output/GetPatent_Application_StatisticsList',
    method: 'post',
    data
  })
}
// 3 咨询报告和出版专著统计
export function getStatisticsReportsAndMono(data) {
  return request({
    url: '/api/yb1_Research_Output/GetStatistics_reports_and_monographssList',
    method: 'post',
    data
  })
}


//  科技奖励
export function technologyAward(data) {
  return request({
    url: '/api/yb1_Science_and_Technology_Award/GetList',
    method: 'post',
    data
  })
}
//  添加科技奖励
export function technologyAwardAdd(data) {
  return request({
      url:'/api/yb1_Science_and_Technology_Award/Add',
      method:'post',
      data
  })
}
// 编辑科技奖励
export function technologyAwardEdit(data){
  return request({
    url:'/api/yb1_Science_and_Technology_Award/Edit',
    method:'post',
    data
  })
}

// 删除科技奖励
export function technologyAwardDel(data){
  return request({
    url:'/api/yb1_Science_and_Technology_Award/Del',
    method:'post',
    data
  })
}




// 专利
export function getPatent(data) {
  return request({
    url: '/api/yb1_patent/GetList',
    method: 'post',
    data
  })
}
// 专利类型
export function getLinTypeList(data) {
  return request({
    url: '/api/yb_Licensing/getLinTypeList',
    method: 'post',
    data
  })
}
// 添加专利
export function patentAdd(data) {
  return request({
    url: '/api/yb1_patent/Add',
    method: 'post',
    data
  })
}
// 编辑专利
export function patentEdit(data) {
  return request({
    url: '/api/yb1_patent/Edit',
    method: 'post',
    data
  })
}
// 删除专利
export function patentDel(data) {
  return request({
    url: '/api/yb1_patent/Del',
    method: 'post',
    data
  })
}
// 软件著作
export function softwareCopyright(data) {
  return request({
    url: '/api/yb1_Software_Copyright/GetList',
    method: 'post',
    data
  })
}
// 添加软件著作
export function softwareCopyrightAdd(data) {
  return request({
    url: '/api/yb1_Software_Copyright/Add',
    method: 'post',
    data
  })
}
// 编辑软件著作
export function softwareCopyrightEdit(data) {
  return request({
    url: '/api/yb1_Software_Copyright/Edit',
    method: 'post',
    data
  })
}
// 删除软件著作
export function softwareCopyrightDel(data) {
  return request({
    url: '/api/yb1_Software_Copyright/Del',
    method: 'post',
    data
  })
}

export function getAwardTypes(data){
  return request({
    url:'/api/yb1_Awardtype/GetList',
    method:'post',
    data
  })
}

export function importzhuanli(data){
  return request({
    url:"/api/Excel/Upload_patent",
    method:'post',
    data,
    headers: {
			'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarynl6gT1BKdPWIejNq',
		  }
  })
}

export function importSoftWare(data){
  return request({
    url:"/api/Excel/Upload_Software",
    method:'post',
    data,
    headers: {
			'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarynl6gT1BKdPWIejNq',
		  }
  })
}




