import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router'
import { useUserAuthStore } from '@/stores/auth'

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
    name: '鉴权',
    component: () => import('@/views/Auth/index.vue'),
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