import Layout from '@/layout'

export default {
  path: '/components',
  component: Layout,
  redirect: '/components/components',
  name: 'ComponentDemo',
  meta: { title: '组件', icon: 'component' },
  children: [
    {
      path: 'components',
      component: () => import('@/views-ui-template/components/components'),
      name: 'Components',
      meta: { title: '小组件' }
    },
    {
      path: 'icon',
      name: 'Icons',
      meta: { title: '图标' },
      component: () => import('@/views-ui-template/components/icons')
    },
    {
      path: 'button-auth',
      name: 'ButtonAuth',
      meta: { title: '按钮权控' },
      buttons: [
        { name: 'add', label: '添加' },
        { name: 'del', label: '删除' },
        { name: 'edit', label: '编辑' },
        { name: 'search', label: '搜索' },
        { name: 'batch', label: '批量处理' }
      ],
      component: () => import('@/views-ui-template/components/button-auth')
    },
    {
      path: 'editor',
      name: 'Editor',
      meta: { title: '编辑器' },
      redirect: '/components/editor/rich-text',
      component: () => import('@/views-ui-template/components/editor'),
      children: [
        {
          path: 'rich-text',
          name: 'RichText',
          meta: { title: '富文本编辑器' },
          component: () => import('@/views-ui-template/components/editor/rich-text')
        },
        {
          path: 'markdown',
          name: 'Markdown',
          meta: { title: 'Markdown 编辑器' },
          component: () => import('@/views-ui-template/components/editor/markdown')
        },
        {
          path: 'json',
          name: 'Json',
          meta: { title: 'Json 编辑器' },
          component: () => import('@/views-ui-template/components/editor/json')
        }
      ]
    },
    {
      path: 'clipboard',
      name: 'Clipboard',
      meta: { title: '剪贴板' },
      component: () => import('@/views-ui-template/components/clipboard')
    },
    {
      path: 'split-pane',
      component: () => import('@/views-ui-template/components/split-pane'),
      name: 'Splitpane',
      meta: { title: '分割面板' }
    },
    {
      path: 'avatar-upload',
      component: () => import('@/views-ui-template/components/avatar-upload'),
      name: 'AvatarUpload',
      meta: { title: '头像上传' }
    },
    {
      path: 'sticky',
      component: () => import('@/views-ui-template/components/sticky'),
      name: 'Sticky',
      meta: { title: '吸顶' }
    },
    {
      path: 'count-to',
      component: () => import('@/views-ui-template/components/count-to'),
      name: 'CountTo',
      meta: { title: '数字滚动' }
    },
    {
      path: 'back-to-top',
      component: () => import('@/views-ui-template/components/back-to-top'),
      name: 'BackToTop',
      meta: { title: '回到顶部' }
    },
    {
      path: 'drag',
      name: 'Drag',
      meta: { title: '拖拽相关' },
      redirect: '/components/drag/drag-dialog',
      component: () => import('@/views-ui-template/components/drag'),
      children: [
        {
          path: 'drag-dialog',
          component: () => import('@/views-ui-template/components/drag/drag-dialog'),
          name: 'DragDialog',
          meta: { title: '拖拽弹窗' }
        },
        {
          path: 'dropzone',
          component: () => import('@/views-ui-template/components/drag/drag-upload'),
          name: 'Dropzone',
          meta: { title: '拖拽上传' }
        },
        {
          path: 'drag-tags',
          component: () => import('@/views-ui-template/components/drag/drag-tags'),
          name: 'DragSelect',
          meta: { title: '拖拽标签' }
        },
        {
          path: 'dnd-list',
          component: () => import('@/views-ui-template/components/drag/drag-list'),
          name: 'DndList',
          meta: { title: '拖拽列表' }
        },
        {
          path: 'drag-kanban',
          component: () => import('@/views-ui-template/components/drag/drag-board'),
          name: 'DragKanban',
          meta: { title: '拖拽看板' }
        }
      ]
    }
  ]
}
