const getters = {
  size: state => state.app.size, // 字体大小
  name: state => state.user.name, // 用户名
  token: state => state.user.token, // token
  role: state => state.user.role, // 用户角色
  device: state => state.app.device, // app 打开设备
  avatar: state => state.user.avatar, // 用户头像
  sidebar: state => state.app.sidebar, // 侧边栏
  errorLogs: state => state.errorLog.logs, // 错误日志
  introduction: state => state.user.introduction, // 用户简介
  cachedViews: state => state.tagsView.cachedViews, // 已经缓存 tab
  visitedViews: state => state.tagsView.visitedViews, // 已打开 tab
  permission_routes: state => state.permission.routes // 用户所有路由
}
export default getters
