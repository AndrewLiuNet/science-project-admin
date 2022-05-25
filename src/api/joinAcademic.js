import request from "@/utils/request";

//获取参加学术会议列表
export function getAttendAcademic(data) {
  return request({
    url: "/api/yb_AttendAcademic/GetAttAcaList",
    method: "post",
    data,
  });
}
//删除
export function deleteAttendAcademic(data) {
  return request({
    url: "/api/yb_AttendAcademic/DelAttAca",
    method: "post",
    data,
  });
}
//添加
export function addAttendAcademic(data) {
  return request({
    url: "/api/yb_AttendAcademic/AddAttAca",
    method: "post",
    data,
  });
}
//修改
export function editAttendAcademic(data) {
  return request({
    url: "/api/yb_AttendAcademic/EditTechAward",
    method: "post",
    data,
  });
}
// 基于年份和名称获取学术论文统计 可以为空
export function academicPaper(data) {
  return request({
    url: "/api/yb1_Statistics_of_academic_paper/GetList",
    method: "post",
    data,
  });
}
// 添加学术论文统计
export function addAcademicPaper(data) {
  return request({
    url: "/api/yb1_Statistics_of_academic_paper/Add",
    method: "post",
    data,
  });
}
// 编辑
export function editAcademicPaper(data) {
  return request({
    url: "/api/yb1_Statistics_of_academic_paper/Edit",
    method: "post",
    data,
  });
}
// 删除
export function delAcademicPaper(data) {
  return request({
    url: "/api/yb1_Statistics_of_academic_paper/Del",
    method: "post",
    data,
  });
}
// 查询咨询报告列表
export function consultingReportyb1(data) {
  return request({
    url: "/api/yb1_Advisory_report/GetList",
    method: "post",
    data,
  });
}
// 添加咨询报告列表
export function addConsultingReportyb1(data) {
  return request({
    url: "/api/yb1_Advisory_report/Add",
    method: "post",
    data,
  });
}
// 编辑咨询报告列表
export function editConsultingReportyb1(data) {
  return request({
    url: "/api/yb1_Advisory_report/Edit",
    method: "post",
    data,
  });
}
// 删除咨询报告列表
export function delConsultingReportyb1(data) {
  return request({
    url: "/api/yb1_Advisory_report/Del",
    method: "post",
    data,
  });
}
// ---------------------------
// 学术著作
export function academicWork(data) {
  return request({
    url: "/api/yb1_Academic_work/GetList",
    method: "post",
    data,
  });
}
// 添加学术著作
export function addAcademicWork(data) {
  return request({
    url: "/api/yb1_Academic_work/Add",
    method: "post",
    data,
  });
}
// 编辑学术著作
export function editAcademicWork(data) {
  return request({
    url: "/api/yb1_Academic_work/Edit",
    method: "post",
    data,
  });
}
// 删除学术著作
export function delAcademicWork(data) {
  return request({
    url: "/api/yb1_Academic_work/Del",
    method: "post",
    data,
  });
}
// 学术论文
export function getAcademicPaper(data) {
  return request({
    url: "/api/yb1_Academic_paper/GetList",
    method: "post",
    data,
  });
}
// 添加学术论文
export function academicPaperAdd(data) {
  return request({
    url: "/api/yb1_Academic_paper/Add",
    method: "post",
    data,
  });
}
// 编辑学术论文
export function academicPaperEdit(data) {
  return request({
    url: "/api/yb1_Academic_paper/Edit",
    method: "post",
    data,
  });
}
// 删除学术论文
export function academicPaperDel(data) {
  return request({
    url: "/api/yb1_Academic_paper/Del",
    method: "post",
    data,
  });
}


export function importAcadmic(data){
  return request({
    url:"/api/Excel/Upload_Academic_work",
    method:'post',
    data,
    headers: {
			'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarynl6gT1BKdPWIejNq',
		  }
  })

}

export function importreport(data){
  return request({
    url:"/api/Excel/Upload_Advisory_report",
    method:'post',
    data,
    headers: {
			'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundarynl6gT1BKdPWIejNq',
		  }
  })
}

