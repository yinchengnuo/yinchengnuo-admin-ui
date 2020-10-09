import Layout from '@/layout'
import { showUI } from '@/settings'

import admin from './modules/admin'
import pages from './modules-ui-template/pages'
import componentsRouter from './modules-ui-template/components'

export default [
  showUI ? pages : undefined,
  showUI ? componentsRouter : undefined,
  showUI ? {
    path: '/new',
    name: 'New',
    redirect: '/new',
    component: Layout,
    alwaysShow: true,
    meta: { title: '新建页面', icon: 'el-icon-magic-stick' },
    children: [
      {
        path: '',
        name: 'New',
        meta: { title: '新建页面', icon: 'el-icon-magic-stick' },
        component: () => import('@/views/new')
      }
    ]
  } : undefined,
  admin
]
