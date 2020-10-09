import Layout from '@/layout'
import { developerView } from '@/settings'

export default [ // 开发者路由路由
  developerView ? {
    path: '/developer',
    name: 'Developer',
    component: Layout,
    redirect: '/developer/api-test',
    meta: { title: '开发调试', icon: 'developer' },
    children: [
      {
        path: 'api-test',
        name: 'ApiTest',
        meta: { title: 'API测试', icon: 'api-test' },
        component: () => import('@/views-developer/api-test')
      },
      {
        path: 'back-end-setting',
        name: 'BackEndSetting',
        meta: { title: '后端设置', icon: 'back-end-setting' },
        component: () => import('@/views-developer/back-end-setting')
      }
    ]
  } : undefined
]
