// import Layout from '@/layout'
import { showUI } from '@/settings'

import pages from './modules-ui-template/pages'
import componentsRouter from './modules-ui-template/components'
import admin from './modules/admin'

export default [
  showUI ? pages : undefined,
  showUI ? componentsRouter : undefined,
  // {
  //   path: '/new',
  //   name: 'New',
  //   redirect: '/new',
  //   component: Layout,
  //   alwaysShow: true,
  //   meta: { title: '新建页面:alwaysShow', icon: 'el-icon-magic-stick' },
  //   children: [
  //     {
  //       path: '',
  //       name: 'New',
  //       meta: { title: '新建页面' },
  //       component: () => import('@/views/New')
  //     }
  //   ]
  // },
  admin
]
