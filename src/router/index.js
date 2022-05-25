import Vue from "vue";
import Router from "vue-router";
import axios from 'axios'

import {
  attrOrginGetList
  } from "@/api/project";



Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

const department=()=>import("@/views/project/common-sciences");
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: {
          title: "主页",
          icon: "dashboard",
        },
      },
    ],
  },

  /**
   * 科研项目
   */
   {
    path: "/project",
    component: Layout,
    meta: {
      title: "科研项目",
      icon: "el-icon-suitcase",
    },
    children: [
      {
        path: "/research-manpower",
        name: "ResearchManpower",
        component: () => import("@/views/project/research-manpower"),
        meta: {
          title: "科研人力",
          icon: "el-icon-user",
        },
      },
      {
        path: "/projectFundsItem",
        name: "ProjectFundsItem",
        component: () => import("@/views/project/project-funds-item"),
        meta: {
          title: "项目经费分项",
          icon: "el-icon-s-ticket",
        },
      },
      {
        path: '/new-projects-number3',
        name: 'NewProjectsNumber3',
        component: () => import('@/views/project/new-projects-number3'),
        meta: {
          title: '新立项目数量',
          icon: 'el-icon-menu'
        },
      },
      {
        path: '/comprehensive2',
        name: 'Comprehensive2',
        component: () => import('@/views/project/comprehensive2'),
        meta: {
          title: '科研项目综合',
          icon: 'el-icon-s-data'
        }
      },
      // {
      //   path: "/common-sciences",
      //   name: "CommonSciences",
      //   component: () => import("@/views/project/common-sciences"),
      //   meta: {
      //     title: "项目详情综合",
      //     icon: "el-icon-data-line",
      //   },
      // },
     
      {
        path: "/natural-sciences",
        name: "NaturalSciences",
        component: () => import("@/views/project/natural-sciences"),
        meta: {
          title: "项目分类信息",
          icon: "el-icon-data-line",
        },
      },
      {
        path: "/project-manage",
        name: "ProjectManage",
        component: () => import("@/views/project/project-manage"),
        meta: {
          title: "项目分类管理",
          icon: "el-icon-data-analysis",
        },
      },
      {
        path: "/attrOrgin-manage",
        name: "AttrOrginManage",
        component: () => import("@/views/project/attrorgin-manage"),
        meta: {
          title: "单位分类管理",
          icon: "el-icon-position",
        },
      },
      // {
      //   path: "/social-sciences",
      //   name: "SocialSciences",
      //   component: () => import("@/views/project/social-sciences"),
      //   meta: {
      //     title: "社会科学基金",
      //     icon: "el-icon-data-analysis",
      //   },
      // },
      // {
      //   path: "/equipment-sciences",
      //   name: "EquipmentSciences",
      //   component: () => import("@/views/project/equipment-sciences"),
      //   meta: {
      //     title: "装备军内科研",
      //     icon: "el-icon-position",
      //   },
      // },
      // {
      //   path: "/technology-sciences",
      //   name: "TechnologySciences",
      //   component: () => import("@/views/project/technology-sciences"),
      //   meta: {
      //     title: "装备技术基础",
      //     icon: "el-icon-cpu",
      //   },
      // },
      // {
      //   path: "/military-sciences",
      //   name: "MilitarySciences",
      //   component: () => import("@/views/project/military-sciences"),
      //   meta: {
      //     title: "全军军事理论",
      //     icon: "el-icon-odometer",
      //   },
      // },
      // {
      //   path: "/school-sciences",
      //   name: "SchoolSciences",
      //   component: () => import("@/views/project/school-sciences"),
      //   meta: {
      //     title: "学校科研计划",
      //     icon: "el-icon-collection",
      //   },
      // },
      // {
      //   path: "/weapons-sciences",
      //   name: "WeaponsSciences",
      //   component: () => import("@/views/project/weapons-sciences"),
      //   meta: {
      //     title: "武器装备预研",
      //     icon: "el-icon-truck",
      //   },
      // },
      // {
      //   path: "/operating-sciences",
      //   name: "OperatingSciences",
      //   component: () => import("@/views/project/operating-sciences"),
      //   meta: {
      //     title: "事业费项目",
      //     icon: "el-icon-wallet",
      //   },
      // },
      // {
      //   path: "/transverse-sciences",
      //   name: "TransverseSciences",
      //   component: () => import("@/views/project/transverse-sciences"),
      //   meta: {
      //     title: "新立横向项目",
      //     icon: "el-icon-s-unfold",
      //   },
      // },
      // {
      //   path: "/other-sciences",
      //   name: "OtherSciences",
      //   component: () => import("@/views/project/other-sciences"),
      //   meta: {
      //     title: "其他项目",
      //     icon: "el-icon-rank",
      //   },
      // },
  
    ],
  },
  /**
   * 科研成果
   */
    {
    path: "/results",
    component: Layout,
    meta: {
      title: "科研成果",
      icon: "el-icon-data-line",
    },
    children: [
      // {
      //   path: 'index',
      //   name: 'PublishedPapers',
      //   component: () => import('@/views/results/index'),
      //   meta: {
      //     title: '发表论文',
      //     icon: 'el-icon-document'
      //   }
      // },
      // // {
      // //   path: '/consulting-report',
      // //   name: 'ConsultingReport',
      // //   component: () => import('@/views/results/consulting-report'),
      // //   meta: {
      // //     title: '咨询报告',
      // //     icon: 'el-icon-notebook-2'
      // //   }
      // // },
      // {
      //   path: '/patent-license',
      //   name: 'PatentLicense',
      //   component: () => import('@/views/results/patent-license'),
      //   meta: {
      //     title: '专利授权',
      //     icon: 'el-icon-s-check'
      //   }
      // },
      // {
      //   path: '/published-works',
      //   name: 'PublishedWorks',
      //   component: () => import('@/views/results/published-works'),
      //   meta: {
      //     title: '出版著作',
      //     icon: 'el-icon-collection'
      //   }
      // },
      // {
      //   path: '/software-copyright',
      //   name: 'SoftwareCopyright',
      //   component: () => import('@/views/results/software-copyright'),
      //   meta: {
      //     title: '软件著作',
      //     icon: 'el-icon-folder-opened'
      //   }
      // },
      {
        path: '/technology-award',
        name: 'TechnologyAward',
        component: () => import('@/views/results/technology-award'),
        meta: {
          title: '科技奖励',
          icon: 'el-icon-present'
        }
      },
      // {
      //   path: "/get-results",
      //   name: "GetResults",
      //   component: () => import("@/views/results/get-results"),
      //   meta: {
      //     title: "获奖成果统计",
      //     icon: "el-icon-present",
      //   },
      // },
      {
        path: "/authorization-patent",
        name: "AuthorizationPatent",
        component: () => import("@/views/results/authorization-patent"),
        meta: {
          title: "授权和专利",
          icon: "el-icon-coin",
        },
      },
      {
        path: "/report-andpublished",
        name: "ReportAndpublished",
        component: () => import("@/views/results/report-andpublished"),
        meta: {
          title: "报告和出版",
          icon: "el-icon-takeaway-box",
        },
      },
      // {
      //   path: "/technology-award",
      //   name: "TechnologyAward",
      //   component: () => import("@/views/results/technology-award"),
      //   meta: {
      //     title: "科技奖励",
      //     icon: "el-icon-collection-tag",
      //   },
      // },
      {
        path: "/patents",
        name: "Patents",
        component: () => import("@/views/results/patents"),
        meta: {
          title: "专利",
          icon: "el-icon-pie-chart",
        },
      },
      {
        path: "/software-works",
        name: "SoftwareWorks",
        component: () => import("@/views/results/software-works"),
        meta: {
          title: "软件著作",
          icon: "el-icon-reading",
        },
      },
    ],
  },
  /**
   * 学术活动
   */
  {
    path: "/academic-activities",
    component: Layout,
    meta: {
      title: "学术活动",
      icon: "el-icon-box",
    },
    children: [
      {
        path: "/academic-paper",
        name: "AcademicPaper",
        component: () => import("@/views/academic-activities/academic-paper"),
        meta: {
          title: "学术论文",
          icon: "el-icon-water-cup",
        },
      },
      {
        path: "/consulting-report",
        name: "ConsultingReport",
        component: () =>
          import("@/views/academic-activities/consulting-report"),
        meta: {
          title: "咨询报告",
          icon: "el-icon-document",
        },
      },
      {
        path: "/academic-work",
        name: "AcademicWork",
        component: () => import("@/views/academic-activities/academic-work"),
        meta: {
          title: "学术著作",
          icon: "el-icon-notebook-2",
        },
      },
      // {
      //   path: '/join-technology',
      //   name: 'JoinTechnology',
      //   component: () => import('@/views/academic-activities/join-technology'),
      //   meta: {
      //     title: '参加科技竞赛',
      //     icon: 'el-icon-trophy'
      //   }
      // }
    ],
  },
  /**
   * 学术活动
   */
  //  {
  //   path: "/echarts",
  //   component: Layout,
  //   meta: {
  //     title: "可视化",
  //     icon: "el-icon-box",
  //   },
  //   children: [
  //     {
  //       path: "/echarts",
  //       name: "Echarts",
  //       component: () => import("@/views/charts/Echarts"),
  //       meta: {
  //         title: "可视化图表",
  //         icon: "el-icon-water-cup",
  //       },
  //     },
  //   ],
  // },
  /**
   * 大事记
   */
  {
    path: "/all-events",
    component: Layout,
    meta: {
      title: "大事记",
      icon: "el-icon-news",
    },
    children: [
      {
        path: "index",
        name: "AllEvents",
        component: () => import("@/views/all-events/index"),
        meta: {
          title: "大事记",
          icon: "el-icon-news",
        },
      },
    ],
  },

  // 跳转到外部链接
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
    // {
    //   path: "*",
    //   redirect: "/404",
    //   hidden: true,
    // },
];
 
    //   let attrOrginList=[];
    //   let icon=[
    //     "el-icon-rank","el-icon-s-unfold","el-icon-wallet","el-icon-truck","el-icon-collection",
    //     "el-icon-odometer","el-icon-cpu","el-icon-position","el-icon-data-analysis","el-icon-data-line",
    //   ]
    //   let params={
    //     "page": 1,
    //     "rows": 100,
    //     "yearId": "",
    //     "searchStr": "",
    //     "attrOrginId": ""
    //   }

    // async function add(){
    //   await attrOrginGetList(params).then( res=>{
    //         attrOrginList=res.data.list;
    //         for(let p=0;p<attrOrginList.length;p++){
    //           let iconIndex=p;
    //           if(iconIndex==attrOrginList.length-1){
    //             iconIndex=0;
    //           }else{
    //             iconIndex++;
    //           }
    //           let route={
    //           path:`/common-science`,
    //           name:'common-science',
    //           component: department,
    //           // id:attrOrginList[p].id,
    //           meta: {
    //               title: attrOrginList[p].attrOrginName,
    //               icon: icon[iconIndex],
    //             },
               
    //           }
    //             constantRoutes[3].children.push(route)
    //         }
    //         sessionStorage.setItem("newRoutes",JSON.stringify(constantRoutes))
    //       })
    //     } 
    //     // {
    //     //   path: "/common-sciences",
    //     //   name: "CommonSciences",
    //     //   component: () => import("@/views/project/common-sciences"),
    //     //   meta: {
    //     //     title: "部门信息",  
    //     //     icon: "el-icon-data-line",
    //     //   },
    //     // }
    //     add();
       
  const createRouter = () =>
    new Router({
      mode: "history", // require service support
      scrollBehavior: () => ({
        y: 0,
      }),
      routes: constantRoutes,
    });

  const router = createRouter();


// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
  export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
  }

  export default router;
