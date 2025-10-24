import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import { useUserAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/panel',
    name: 'panel',
    meta: {
      title: '面板',
    },
    redirect: '/panel/dashboard',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/Panel/Dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          icon: 'Odometer',
        },
      },
      {
        path: 'project',
        name: 'project',
        component: () => import('@/views/Panel/Project.vue'),
        meta: {
          title: '项目管理',
          icon: 'Promotion',
        },
      },
      {
        path: 'statistics',
        name: 'statistics',
        meta: {
          title: '数据统计',
          icon: 'DataAnalysis',
        },
        children: [
          {
            path: 'visible',
            name: 'visible',
            component: () => import('@/views/Panel/Project.vue'),
            meta: {
              title: '数据可视化',
              icon: 'DataLine',
            }
          },
          {
            path: 'annual',
            name: 'annual',
            component: () => import('@/views/Panel/Menu.vue'),
            meta: {
              title: '年度数据统计',
              icon: 'Calendar',
            }
          },
          {
            path: 'special',
            name: 'special',
            meta: {
              title: '专项统计',
              icon: 'List',
            },
            children: [
              {
                path: 'financial',
                name: 'financial',
                component: () => import('@/views/Panel/Menu.vue'),
                meta: {
                  title: '财务数据统计',
                  icon: 'Money',
                },
              },
              {
                path: 'humanpower',
                name: 'humanpower',
                component: () => import('@/views/Panel/Menu.vue'),
                meta: {
                  title: '人力成本统计',
                  icon: 'UserFilled',
                },
              },
            ]
          },
        ],
      },
      {
        path: 'dataEntry',
        name: 'dataEntry',
        component: () => import('@/views/Panel/Menu.vue'),
        meta: {
          title: '数据录入',
          icon: 'EditPen',
        },
        children: [ 
          {
            path: 'member',
            name: 'member',
            component: () => import('@/views/Panel/Menu.vue'),
            meta: {
              title: '员工数据录入',
              icon: 'UserFilled',
            },
          },
          {
            path: 'ticket',
            name: 'ticket',
            component: () => import('@/views/Panel/Menu.vue'),
            meta: {
              title: '发票数据录入',
              icon: 'Ticket',
            },
          },
          {
            path: 'contract',
            name: 'contract',
            component: () => import('@/views/Panel/Menu.vue'),
            meta: {
              title: '合同数据录入',
              icon: 'Document',
            },
          }
        ]
      },
      {
        path: 'backup',
        name: 'backup',
        component: () => import('@/views/Panel/Menu.vue'),
        meta: {
          title: '数据备份',
          icon: 'CopyDocument',
        },
        children: [ 
          {
            path: 'import',
            name: 'import',
            component: () => import('@/views/Panel/Menu.vue'),
            meta: {
              title: '数据导入',
              icon: 'Download',
            },
          },
          {
            path: 'export',
            name: 'export',
            component: () => import('@/views/Panel/Menu.vue'),
            meta: {
              title: '数据导出',
              icon: 'Upload',
            },
          },
        ]
      }
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    meta: {
      title: '鉴权',
    },
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