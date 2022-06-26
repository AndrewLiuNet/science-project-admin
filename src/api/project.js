import request from '@/utils/request'
import { post } from 'jquery'


//获取项目立项列表
export function getResearListData(data) {
  return request({
    url: '/api/yb_Researchapproval/GetResearList',
    method: 'post',
    data
  })
}
//获取年份
export function getYearListData(data) {
  return request({
    url: '/api/yb_Year',
    method: 'post',
    data
  })
}
// //获取项目立项类型
// export function getProjectTypeListData(data) {
//   return request({
//     url: '/api/yb_ProjectType/GetProjectTypeList',
//     method: 'post',
//     data
//   })
// }
//获取项目立项级别
export function getProjectLevelListData(data) {
  return request({
    url: '/api/yb_ProjectLevel/GetProjectTypeList',
    method: 'post',
    data
  })
}
//添加项目立项
export function addProjectForm(data) {
  return request({
    url: '/api/yb_Researchapproval/AddResearchapproval',
    method: 'post',
    data
  })
}
//编辑提交
export function editFormSub(data) {
  return request({
    url: '/api/yb_Researchapproval/EditResearById',
    method: 'post',
    data
  })
}
//删除单行项目立项
export function delProjectRow(data) {
  return request({
    url: '/api/yb_Researchapproval/DeleteResearById',
    method: 'post',
    data
  })
}
//结项列表
export function finishResearListData(data) {
  return request({
    url: '/api/yb_Researchapproval/GetFinishResearList',
    method: 'post',
    data
  })
}
//将立项改为结项
export function finishResear(data) {
  return request({
    url: '/api/yb_Researchapproval/FinishResearById',
    method: 'post',
    data
  })
}



// ----------------------------------------------------
// 查询部门列表
export function attrOrginGetList(data) {
  return request({
    url: '/api/yb1_AttrOrgin/GetList',
    method: 'post',
    data
  })
}
export function attrOriginById(data){
  return request({
    url:'/api/yb1_AttrOrgin/Get',
    method:'post',
    data
  })
}

//查询各系科研人力 
export function researchManpower(data) {
  return request({
    url: '/api/yb1_scientific_research_manpower/GetList',
    method: 'post',
    data
  })
}
//添加各系科研人力 
export function addResearchManpower(data) {
  return request({
    url: '/api/yb1_scientific_research_manpower/Add',
    method: 'post',
    data
  })
}
//编辑各系科研人力 
export function editResearchManpower(data) {
  return request({
    url: '/api/yb1_scientific_research_manpower/Edit',
    method: 'post',
    data
  })
}
//删除各系科研人力 
export function delResearchManpower(data) {
  return request({
    url: '/api/yb1_scientific_research_manpower/Del',
    method: 'post',
    data
  })
}

//项目经费分项统计 可传单位id、年份id，分页不可用
export function researchFunds(data) {
  return request({
    url: '/api/yb1_research_funds/GetList',
    method: 'post',
    data
  })
}
//新立项目数量统计表 可传单位id、年份id，分页不可用
export function researchProjectsStatistical(data) {
  return request({
    url: '/api/yb1_scientific_research_projects_statistical/GetStatistics_of_new_projectsList',
    method: 'post',
    data
  })
}

// 科研项目综合统计 可传单位id、年份id，分页不可用
export function GetProjects_StatisticalList(data){
  return request({
    url: '/api/yb1_scientific_research_projects_statistical/GetProjects_StatisticalList',
    method: 'post',
    data
  })
}

// 获取项目级别列表
export function getProjectTypeList(data) {
  return request({
    url: '/api/yb_ProjectType/GetProjectTypeList',
    method: 'post',
    data
  })
}

// 科研项目
export function researchProject(data) {
  return request({
    url: '/api/yb1_research_project/GetList',
    method: 'post',
    data
  })
}
// 添加科研项目
export function addResearchProject(data) {
  return request({
    url: '/api/yb1_research_project/Add',
    method: 'post',
    data
  })
}
// 编辑科研项目
export function editResearchProject(data) {
  return request({
    url: '/api/yb1_research_project/Edit',
    method: 'post',
    data
  })
}
// 删除科研项目
export function delResearchProject(data) {
  return request({
    url: '/api/yb1_research_project/Del',
    method: 'post',
    data
  })
}



export async function importProject(data){
   return await request({
    url:"/api/Excel/Upload_research_project",
    method:'post',
    data,
    headers: {
			'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarynl6gT1BKdPWIejNq',
		  }
  })
}

export function addProjectType(data){
  return request({
    url:'/api/yb_ProjectType/AddProjectType',
    method:'post',
    data,
  })
}
export function delProjectType(data){
  return request({
    url:'/api/yb_ProjectType/DelProjectType',
    method:'post',
    data,
  })
}

export function addAttrorgin(data){
  return request({
    url:'/api/yb1_AttrOrgin/Add',
    method:'post',
    data,
  })
}

export function delAttrorign(data){
  return request({
    url:'/api/yb1_AttrOrgin/Del',
    method:'post',
    data,
  })
}

export function editAttrOrign(data){
  return request({
    url:'/api/yb1_AttrOrgin/Edit',
    method:'post',
    data,
  })
}

export function EditProjectType(data){
  return request({
    url:'/api/yb_ProjectType/EditProjectType',
    method:'post',
    data,
  })
}

export function getPageProjectType(data){
  return request({
    url:'/api/yb_ProjectType/GetProjectTypeListPage',
    method:'post',
    data,
  })
}