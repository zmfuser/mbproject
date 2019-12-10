import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/info',
    name: '个人信息',
    children: [{
      path: 'info',
      name: '个人信息',
      meta: {
        title: '个人信息'
      },
      component: () => import('@/views/sys/userInfo')
    }],
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    meta: {
      icon: 'dashboard'
    },
    children: [{
      path: 'dashboard',
      name: '首页',
      meta: {
        title: '首页'
      },
      component: () => import('@/views/dashboard/index')
    }]
  },
  { path: '*', component: () => import('@/views/404'), hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

//需要鉴权、动态匹配的路由
export const asyncRouterMap = [
  {
    path: '/system',
    name: '系统管理',
    component: Layout,
    redirect: '/system/employee',
    meta: {
      title: '系统管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'employee',
        name: '系统用户管理',
        component: () => import('@/views/sys/employee'),
        menu: 'employee',
        meta: {
          title: '系统用户管理'
        }
      },
      {
        path: 'role',
        name: '角色管理',
        component: () => import('@/views/sys/role'),
        menu: 'role',
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'permission',
        name: '权限点管理',
        component: () => import('@/views/sys/SysPermission'),
        menu: 'permission',
        meta: {
          title: '权限点管理'
        }
      },
      {
        path: 'dictItem',
        name: '数据字典项管理',
        component: () => import('@/views/sys/sysDictItem'),
        menu: 'dictItem',
        meta: {
          title: '数据字典项管理'
        }
      },
      {
        path: 'code',
        name: '代码生成',
        component: () => import('@/views/sys/tables'),
        menu: 'code',
        meta: {
          title: '代码生成'
        }
      },
      {
        path: 'apidoc',
        name: 'API文档',
        component: () => import('@/views/sys/SysApiUrl'),
        menu: 'apidoc',
        meta: {
          title: 'API文档'
        }
      },
      {
        path: 'appUserManager',
        name: '终端用户管理',
        component: () => import('@/views/usermanager/BsAppUser'),
        // menu: 'appUserManager',
        meta: {
          title: '终端用户管理'
        }
      },
      {
        path: '/BsPushTemplete',
        name: '消息推送模板配置',
        component: () => import('@/views/push/BsPushTemplete'),
        // menu: "BsPushTemplete",
        meta: {
          title: '消息推送模板配置'
        }
      }
    ]
  },
  {
    path: '/manB',
    name: '档案管理',
    component: Layout,
    meta: {
      title: '档案管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'manBing',
        name: '慢病档案管理',
        component: () => import('@/views/sys/manBIng'),
        menu: 'manbing',
        meta: {
          title: '慢病档案管理'
        }
      },
      // 主表添加
      {
        path: '/base',
        component: () => import('@/views/table/FileTemplate/lentivirus'),
        menu: 'manbing',
        hidden: true
      },
      // 编辑主表
      {
        path: '/editBase',
        component: () => import('@/views/edit/lentivirus'),
        menu: 'manbing',
        hidden: true
      },
      // 附表添加
      {
        path: '/tableFile',
        component: () => import('@/views/sys/tableFile'),
        menu: 'manbing',
        hidden: true
      },
      // 健康计划添加
      {
        path: '/fitPlan',
        component: () => import('@/views/table/FileTemplate/prescription'),
        menu: 'fitness',
        hidden: true
      },
      // 慢病界面的预览
      {
        path: '/Ybase',
        component: () => import('@/views/preview/manbing/index'),
        menu: 'manbing',
        hidden: true
      },

      {
        path: 'suifang',
        name: '随访记录管理',
        component: () => import('@/views/sys/suifang'),
        menu: 'followupRecord',
        meta: {
          title: '随访记录管理'
        }
      },
      // 添加随访记录管理
      {
        path: '/tableSF',
        component: () => import('@/views/sys/tableSF'),
        menu: 'followupRecord',
        hidden: true
      },
      // 编辑随访界面
      {
        path: '/update',
        component: () => import('@/views/edit/suifang/index'),
        menu: 'followupRecord',
        hidden: true
      },
      // 预览随访记录界面
      {
        path: '/Sbase',
        component: () => import('@/views/preview/suifang/index'),
        menu: 'followupRecord',
        hidden: true
      },
      {
        path: 'healthplan',
        name: '健康计划',
        component: () => import('@/views/sys/BsHealthPlan'),
        menu: 'fitness',
        meta: {
          title: '健康计划'
        }
      },
      // 编辑慢病处方
      {
        path: '/editFitPlan',
        component: () => import('@/views/edit/prescription'),
        menu: 'fitness',
        hidden: true
      },
      // 预览慢病处方
      {
        path: '/Yfitplan',
        component: () => import('@/views/preview/manbing/FileTemplate/prescription'),
        menu: 'fitness',
        hidden: true
      }
    ]
  },
  {
    path: '/client',
    name: '客户管理',
    component: Layout,
    meta: {
      title: '客户管理',
      icon: 'nested'
    },
    children: [
      {
        path: '/singManager',
        name: '签约管理',
        component: () => import('@/views/sign/BsSignApplication'),
        menu: 'sign',
        meta: {
          title: '签约管理'
        }
      },
      {
        path: '/doctor',
        name: '医生管理',
        component: () => import('@/views/sys/client'),
        menu: 'selectdoctor',
        meta: {
          title: '医生管理'
        }
      },
      {
        path: '/department',
        name: '科室管理',
        component: () => import('@/views/sys/department'),
        menu: 'department',
        meta: {
          title: '科室管理'
        }
      },
      {
        path: '/BsHealthTeam',
        name: '健康团队管理',
        component: () => import('@/views/sys/BsHealthTeam'),
        menu: "fitteam",
        meta: {
          title: '健康团队管理'
        }
      },
      {
        path: '/BsInquiry',
        name: '就诊记录管理',
        component: () => import('@/views/inquiry/BsInquiry'),
        menu: "outpatient",
        meta: {
          title: '就诊记录管理'
        }
      },
      {
        name: 'medicalRecordsDetail',
        path: '/medicalRecordsDetail',
        component: () => import('@/views/inquiry/medicalRecordsDetail'),
        hidden: true
      },
      {
        name: 'medicalRecordsDetailUpdate',
        path: '/medicalRecordsDetail-update',
        component: () => import('@/views/inquiry/medicalRecordsDetail-update'),
        hidden: true
      },
      {
        name: 'medicalRecordsDetailUpdate',
        path: '/medicalRecordsDetail-preview',
        component: () => import('@/views/inquiry/medicalRecordsDetail-preview'),
        hidden: true
      },
      {
        path: '/disease',
        name: '疾病管理',
        component: () => import('@/views/disease/BsDisease'),
        menu: "illness",
        meta: {
          title: '疾病管理'
        }
      },
      {
        path: '/BsDrugs',
        name: '药品管理',
        component: () => import('@/views/drugs/BsDrugs'),
        menu: "drug",
        meta: {
          title: '药品管理'
        }
      },
      {
        path: '/myAppointment',
        name: '我的处方',
        component: () => import('@/views/myappointment/myAppointment'),
        menu: "myprescription",
        meta: {
          title: '我的处方'
        }
      },
      {
        path: '/hospital',
        name: '医院管理',
        component: () => import('@/views/hospital/BsHospital'),
        menu: "hospital",
        meta: {
          title: '医院管理'
        }
      },
      {
        path: '/appointment',
        name: '预约管理',
        component: () => import('@/views/inquiry/BsOutpatientAppointment'),
        menu: "booking",
        meta: {
          title: '预约管理'
        }
      },
      {
        path: '/toMedicalRecordsDetail',
        name: '预约管理健康计划模板',
        hidden: true,
        component: () => import('@/views/myappointment/toMedicalRecordsDetail'),
        // menu: "userResource",
       
      },
      {
        path: '/userResource',
        name: '居民资料管理',
        component: () => import('@/views/userresource/BsInspectionData'),
        menu: "resident",
        meta: {
          title: '居民资料管理'
        }
      },
      {
        path: '/fitTemplate',
        name: '我的健康计划模板',
        component: () => import('@/views/healthPlan/healthPlan'),
        menu: "fitTemplate",
        meta: {
          title: '我的健康计划模板'
        }
      },
      {
        path: '/healthTemplate',
        hidden: true,
        menu: "fitTemplate",
        component: () => import('@/views/healthPlan/healthTemplate'),
      },
      {
        path: '/healthTemplate-update',
        hidden: true,
        menu: "fitTemplate",
        component: () => import('@/views/healthPlan/healthTemplate-update'),
      },
      {
        path: '/BsSchedulingLog',
        name: '排班管理',
        component: () => import('@/views/workplan/BsSchedulingLog'),
        // menu: "BsSchedulingLog",
        meta: {
          title: '排班管理'
        }
      },
      {
        path: '/hospitalSheduling',
        name: 'hospitalSheduling',
        hidden: true,
        component: () => import('@/views/workplan/hospitalSheduling'),
        // menu: "BsSchedulingLog",
      },
      {
        path: '/hospitalShedulingUpdate',
        name: 'hospitalShedulingUpdate',
        hidden: true,
        component: () => import('@/views/workplan/hospitalShedulingUpda'),
        // menu: "BsSchedulingLog",
      },
    ]
  },
  {
    path: '/addArticle',
    name: '健康卫士',
    component: Layout,
    meta: {
      title: '健康卫士',
      icon: 'nested'
    },
    children: [
      {
        path: '/BsHealthGuard',
        name: '文章管理',
        component: () => import('@/views/article/BsHealthGuard.vue'),
        meta: {
          title: '文章管理'
        }
      },
      // 编辑
      {
        path: '/editUEditor',
        component: () => import('@/views/edit/UEditor.vue'),
        hidden:true,
        menu:"ueditor"
      },
      {
        path: '/UEditor',
        component: () => import('@/views/sys/UEditor.vue'),
        hidden: true,
        menu: "ueditor"
      }
    ]
  },
  
]

