import
// request,
{ mock }
  from '@/utils/request'

export const api_logout = () => mock.get('/logon/logout') // 推出登录
export const api_login = data => mock.post('/logon/login', data) // 登录获取 token
export const api_getInfo = params => mock.get('/logon/info', { params }) // 登录获取用户信息

export const api_psw = data => mock.post('/logon/psw', data) // 修改密码
export const api_todo = data => mock.post('/logon/todo', data) // 更新待办事项
export const api_avatar = data => mock.post('/logon/avatar', data) // 更新头像
