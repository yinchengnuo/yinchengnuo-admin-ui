const steps = [
  {
    element: '#hamburger-container',
    popover: {
      title: '侧边栏开关',
      position: 'bottom',
      description: '可以打开/关闭侧边栏'
    }
  },
  {
    element: '#breadcrumb-container',
    popover: {
      title: '面包屑',
      position: 'bottom',
      description: '显示的是当前所在的页面'
    }
  },
  {
    element: '#header-search',
    popover: {
      title: '搜索框',
      position: 'left',
      description: '可以在此搜索想要进入的页面'
    }
  },
  {
    element: '#screenfull',
    popover: {
      title: '全屏',
      position: 'left',
      description: '这里可以进入/退出全屏'
    }
  },
  {
    element: '#size-select',
    popover: {
      position: 'left',
      title: '字体大小',
      description: '这里可以选择主题字体大小'
    }
  },
  {
    element: '#tags-view-container',
    popover: {
      title: '快捷标签',
      position: 'bottom',
      description: '这里可以快速切换已经打开过的页面同时你也可以拖动它们来调整位置'
    },
    padding: 0
  }
]

export default steps
