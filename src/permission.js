import path from 'path'
import store from './store'
import router from './router'
import NProgress from 'nprogress'
import { asyncRoutes } from '@/router'
import { getToken } from '@/utils/auth'
const { title, whiteList } = require('@/settings')

NProgress.configure({ showSpinner: false })

const afterEach = to => { // 路由结束方法
  window[title] = title
  NProgress.done() // 进度条结束运动
  if (to && to.meta && to.meta.target === '_blank') { // 如果当前路由是要在新的页面打开的
    window.name = '' // 将 window.name 设置为空
  } else { // 如果当前路由不在新的页面打开
    window.name = title // 将 windwow 设置为 app title 。这里使用 window.name 作为区分默认路由和 meta.target === '_blank' 的路由，你也可以使用一个 window[xxx] 作为标识
  }
}

router.beforeEach(async(to, from, next) => { // 全局路由导航守卫
  NProgress.start() // 进度条开始运动
  document.title = to.meta.title ? `${to.meta.title}-${title}` : `${title}` // 改变标题
  if (getToken()) { // 如果用户已登录
    if (to.path === '/login') { // 如果是进入登录页
      next({ path: '/' }) // 直接进入首页
    } else { // 否则
      if (store.getters.role) { // 如果用户有路由表
        // if (to.path === '/404') { // 如果用户进入了一个没有权限的路由
        if (to.meta.target === '_blank') { // 如果进入的路由需要在新的页面打开
          if (window.name) { // 如果页面已经在新的页面打开
            next(false) // 取消路由
            afterEach() // 路由结束
            window.open(`${router.mode === 'hash' ? '#' : ''}${to.path}`) // 在新的页面打开
          } else { // 如果未在新的页面打开
            !to.meta.layout && store.dispatch('app/newWindow') // 将应用状态设置为在新 tab 打开
            next() // 直接进入
          }
        } else {
          if (to.path === '/404' && to.redirectedFrom) { // 如果是进入 404 页面，表示没有匹配到可能是 404/401
            const paths = []
            const getPath = (routes, basePath = '/') => {
              routes.forEach(route => {
                const p = path.resolve(basePath, route.path)
                paths.push(p)
                if (route.children) {
                  getPath(route.children, p)
                }
              })
            }
            getPath(asyncRoutes) // 获取所有权限路由
            if (paths.includes(to.redirectedFrom)) { // 判断进入 404 的前一个页面是否存在权限路由中，存在表示没有权限
              next({ path: '/401', replace: true }) // replace 到 401
            } else {
              next() // 否则就进入 404
            }
          } else {
            next() // 正常进入
          }
        }
      } else { // 如果用户没有路由表，表示用户刷新了页面，或者用户在一个新的 tab 打开了后台
        try {
          router.addRoutes(await store.dispatch('permission/generateRoutes', (await store.dispatch('user/getInfo')))) // 重新请求后端路由表，并序列化后挂载
          next({ ...to, replace: true }) // 正常进入
        } catch (error) {
          afterEach() // 路由结束
          store.dispatch('user/resetToken') // 删除登录状态
          next(`/login?redirect=${to.path}`) // 进入登陆页
          G.$message.error(error || '系统可能出了点问题') // 显示错误信息
        }
      }
    }
  } else { // 如果用户未登录
    if (whiteList.find(path => path === to.path)) { // 如果进入路由位于路由白名单
      next() // 直接进入
    } else { // 否则
      next(`/login?redirect=${to.path}`) // 进入登陆页面
    }
  }
})

router.afterEach(to => afterEach(to)) // 路由进行结束
