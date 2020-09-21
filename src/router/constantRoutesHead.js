import Layout from '@/layout'

export default [ // 公共路由列表头部
  {
    path: '/',
    hidden: true,
    redirect: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('@/views-constant/index'),
        meta: { title: '首页', icon: 'el-icon-house', affix: true }
      }
    ]
  },
  {
    path: '/login',
    hidden: true,
    component: () => import('@/views-constant/login')
  },
  {
    path: '/404',
    hidden: true,
    component: () => import('@/views-constant/error-page/404')
  },
  {
    path: '/401',
    hidden: true,
    component: () => import('@/views-constant/error-page/401')
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views-constant/redirect')
      }
    ]
  },
  {
    hidden: true,
    path: '/personal',
    component: Layout,
    redirect: '/personal/',
    children: [
      {
        path: '',
        name: 'Personal',
        meta: { title: '个人中心', icon: 'user' },
        component: () => import('@/views-constant/personal')
      }
    ]
  }
]
