import Layout from '@/layout'

export default {
  path: '/pages',
  name: 'Pages',
  component: Layout,
  redirect: '/pages/charts/keyboard',
  meta: { title: '页面', icon: 'nested' },
  children: [
    {
      path: 'charts',
      name: 'Charts',
      redirect: '/pages/charts/keyboard',
      meta: { title: '图表', icon: 'chart' },
      component: () => import('@/views-ui-template/pages/charts'),
      children: [
        {
          path: 'keyboard',
          name: 'KeyboardChart',
          meta: { title: '键盘图' },
          component: () => import('@/views-ui-template/pages/charts/keyboard')
        },
        {
          path: 'line',
          name: 'LineChart',
          meta: { title: '折线图' },
          component: () => import('@/views-ui-template/pages/charts/line')
        },
        {
          path: 'mix-chart',
          name: 'MixChart',
          meta: { title: '混合图' },
          component: () => import('@/views-ui-template/pages/charts/mix-chart')
        }
      ]
    },
    {
      path: 'table',
      name: 'Table',
      redirect: '/pages/table/complex-table',
      meta: { title: '表格', icon: 'table' },
      component: () => import('@/views-ui-template/pages/table'),
      children: [
        {
          path: 'complex-table',
          name: 'ComplexTable',
          meta: { title: '综合表格' },
          component: () => import('@/views-ui-template/pages/table/complex-table')
        },
        {
          path: 'dynamic-table',
          name: 'DynamicTable',
          meta: { title: '动态表格' },
          component: () => import('@/views-ui-template/pages/table/dynamic-table')
        },
        {
          path: 'drag-table',
          name: 'DragTable',
          meta: { title: '拖拽表格' },
          component: () => import('@/views-ui-template/pages/table/drag-table')
        },
        {
          path: 'inline-edit-table',
          name: 'InlineEditTable',
          meta: { title: '行间编辑' },
          component: () => import('@/views-ui-template/pages/table/inline-edit-table')
        }
      ]
    },
    {
      path: 'excel',
      name: 'Excel',
      redirect: '/pages/excel/export-excel',
      meta: { title: 'Excel', icon: 'excel' },
      component: () => import('@/views-ui-template/pages/excel'),
      children: [
        {
          path: 'export-excel',
          name: 'ExportExcel',
          meta: { title: '导出 Excel' },
          component: () => import('@/views-ui-template/pages/excel/export-excel')
        },
        {
          name: 'SelectExcel',
          meta: { title: '导出选中' },
          path: 'export-selected-excel',
          component: () => import('@/views-ui-template/pages/excel/select-excel')
        },
        {
          name: 'MergeHeader',
          path: 'export-merge-header',
          meta: { title: '合并表头' },
          component: () => import('@/views-ui-template/pages/excel/merge-header')
        },
        {
          path: 'upload-excel',
          name: 'UploadExcel',
          meta: { title: '上传 Excel' },
          component: () => import('@/views-ui-template/pages/excel/upload-excel')
        }
      ]
    },
    {
      path: 'example',
      name: 'Example',
      redirect: '/pages/example/list',
      meta: { title: '综合示例', icon: 'el-icon-s-help' },
      component: () => import('@/views-ui-template/pages/example'),
      children: [
        {
          path: 'list',
          name: 'ArticleList',
          meta: { title: '文章列表', icon: 'list' },
          component: () => import('@/views-ui-template/pages/example/list')
        },
        {
          path: 'create',
          name: 'CreateArticle',
          meta: { title: '新建文章', icon: 'edit' },
          component: () => import('@/views-ui-template/pages/example/create')
        },
        {
          hidden: true,
          name: 'EditArticle',
          path: 'edit/:id',
          component: () => import('@/views-ui-template/pages/example/edit'),
          meta: { title: '编辑文章', noCache: true, activeMenu: '/example/list' }
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      name: 'ErrorPages',
      redirect: '/404',
      meta: { title: '错误页面', icon: '404' },
      children: [
        {
          path: '401',
          name: 'Page401',
          meta: { title: '401' },
          component: () => import('@/views-constant/error-page/401')
        },
        {
          path: '404',
          name: 'Page404',
          meta: { title: '404' },
          component: () => import('@/views-constant/error-page/404')
        }
      ]
    },
    {
      path: 'zip',
      name: 'Zip',
      alwaysShow: true,
      redirect: '/pages/zip/download',
      meta: { title: 'Zip', icon: 'zip' },
      component: () => import('@/views-ui-template/pages/zip'),
      children: [
        {
          path: 'download',
          name: 'ExportZip',
          meta: { title: '导出ZIP' },
          component: () => import('@/views-ui-template/pages/zip/download')
        }
      ]
    },
    {
      path: 'tab',
      name: 'Tab',
      redirect: '/pages/tab',
      meta: { title: 'Tab', icon: 'tab' },
      component: () => import('@/views-ui-template/pages/zip'),
      children: [
        {
          path: '',
          name: 'TabIndex',
          meta: { title: 'Tab', icon: 'tab' },
          component: () => import('@/views-ui-template/pages/tab')
        }
      ]
    },
    {
      path: 'error-log',
      name: 'ErrorLog',
      meta: { title: '错误日志', icon: 'bug' },
      component: () => import('@/views-ui-template/pages/error-log')
    }
  ]
}
