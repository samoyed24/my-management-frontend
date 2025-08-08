import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import { useUserAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/panel',
    name: '面板',
    redirect: '/panel/dashboard',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: 'dashboard',
        name: '仪表盘',
        component: () => import('@/views/Panel/Dashboard.vue'),
        meta: {
          title: '仪表盘',
          icon: 'Odometer'
        }
      },
      {
        path: 'statistics',
        name: '数据统计',
        component: () => import('@/views/Panel/Dashboard.vue'),
        meta: {
          title: '数据统计',
          icon: 'DataAnalysis'
        },
        children: [
          {
            path: 'visible',
            name: '数据可视化',
            component: () => import('@/views/Panel/Menu.vue'),
            meta: {
              title: '数据可视化',
              icon: 'DataLine'
            }
          },
          {
            path: 'annual',
            name: '年度数据统计',
            component: () => import('@/views/Panel/Menu.vue'),
            meta: {
              title: '年度数据统计',
              icon: 'Calendar'
            }
          },
          {
            path: 'special',
            name: '专项统计',
            component: () => import('@/views/Panel/Menu.vue'),
            meta: {
              title: '专项统计',
              icon: 'List'
            },
            children: [
              {
                path: 'financial',
                name: '销售数据',
                component: () => import('@/views/Panel/Menu.vue'),
                meta: {
                  title: '财务数据统计',
                  icon: 'Money'
                }
              },
              {
                path: 'humanpower',
                name: '人力成本',
                component: () => import('@/views/Panel/Menu.vue'),
                meta: {
                  title: '人力成本统计',
                  icon: 'UserFilled'
                }
              },
            ]
          },
        ]
      },
      {
        path: 'dataEntry',
        name: '数据录入',
        component: () => import('@/views/Panel/Menu.vue'),
        meta: {
          title: '数据录入',
          icon: 'EditPen'
        },
        children: [ 
          {
            path: 'member',
            name: '员工数据',
            component: () => import('@/views/Panel/Menu.vue'),
            meta: {
              title: '员工数据录入',
              icon: 'UserFilled'
            },
          },
          {
            path: 'financial',
            name: '发票数据',
            component: () => import('@/views/Panel/Menu.vue'),
            meta: {
              title: '发票数据录入',
              icon: 'Ticket'
            },
          },
          {
            path: 'contract',
            name: '合同数据',
            component: () => import('@/views/Panel/Menu.vue'),
            meta: {
              title: '合同数据录入',
              icon: 'Document'
            },
          }
        ]
      },
      {
        path: 'backup',
        name: '数据备份',
        component: () => import('@/views/Panel/Menu.vue'),
        meta: {
          title: '数据备份',
          icon: 'CopyDocument'
        },
        children: [ 
          {
            path: 'import',
            name: '导入',
            component: () => import('@/views/Panel/Menu.vue'),
            meta: {
              title: '数据导入',
              icon: 'Download'
            },
          },
          {
            path: 'export',
            name: '导出',
            component: () => import('@/views/Panel/Menu.vue'),
            meta: {
              title: '数据导出',
              icon: 'Upload'
            },
          },
        ]
      }
    ],
  },
  {
    path: '/auth',
    name: '鉴权',
    component: () => import('@/views/Auth/index.vue'),
  },
  {
    path: '/',
    redirect: '/panel/dashboard'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const user = useUserAuthStore()
  if (user.isLoggedIn && to.path === '/auth') {
    return next('/panel/dashboard')
  }

  if (!user.isLoggedIn && to.path !== '/auth') {
    return next('/auth')
  }
  next()
})

export default router