import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/panel',
    name: '面板',
    component: () => import('@/layouts/Panel/index.vue'),
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
        path: 'menu',
        name: '菜单',
        component: () => import('@/views/Panel/Menu.vue'),
        meta: {
          title: '菜单',
          icon: 'Menu'
        }
      },
      
    ],
  },
  {
    path: '/auth',
    name: '登录/注册',
    component: () => import('@/layouts/Auth/index.vue'),
    children: [

    ],
  },
  {
    path: '/',
    redirect: '/panel/dashboard'
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router