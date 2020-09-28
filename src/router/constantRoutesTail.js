import Layout from '@/layout'
import { showUI } from '@/settings'

export default [ // 公共路由列表尾部
  showUI ? {
    path: '/document',
    name: 'Document',
    component: Layout,
    redirect: '/document/',
    meta: { title: '项目文档', icon: 'pdf' },
    children: [
      {
        path: '',
        name: 'DocumentShow',
        meta: { title: '项目文档' },
        component: () => import('@/views-constant/document')
      },
      {
        hidden: true,
        path: '/pdf/download',
        name: 'DocumentDownload',
        meta: { title: '下载文档', target: '_blank' },
        component: () => import('@/views-constant/document/download')
      }
    ]
  } : undefined,
  showUI ? {
    path: 'gitignore',
    name: 'Gitignore',
    component: Layout,
    children: [
      {
        path: 'https://github.com/yinchengnuo/yinchengnuo-admin-ui',
        meta: { title: '仓库地址', icon: 'link' }
      }
    ]
  } : undefined,
  { path: '*', redirect: '/404', hidden: true }
]
