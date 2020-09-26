const role = require('./data/role')
const user = require('./data/user')
const dept = require('./data/dept')

const USER = user
const ROLE = role
const DEPT = dept

module.exports = [
  {
    url: '/logon/login', // 用户登录
    type: 'post',
    response: ({ body: { username, password }}) => {
      const user = USER.find(e => e.username === username) // 根据 username 查询用户
      if (user && user.password === password) { // 用户存在且密码正确将 username 最为 token 返回
        return {
          code: 200,
          data: encodeURIComponent(username)
        }
      } else {
        return {
          code: 406,
          message: '用户名或者密码错误'
        }
      }
    }
  },
  {
    url: '/logon/logout', // 用户退出登录
    type: 'get',
    response: _ => ({ code: 200 })
  },
  {
    url: '/logon/info', // 获取用户信息
    type: 'get',
    response: ({ query: { token }}) => {
      const user = USER.find(e => e.username === decodeURIComponent(token)) // 根据 username 查询用户
      return {
        code: 200,
        data: {
          ...user,
          ...ROLE.find(e => e.roleID === user.roleID) // 根据 roleID 获取角色信息
        }
      }
    }
  },
  {
    url: '/admin/role/all', // 获取角色列表
    type: 'get',
    response: ({ query: { token }}) => {
      const user = USER.find(e => e.username === decodeURIComponent(token)) // 根据 username 查询用户
      const role = ROLE.find(e => e.roleID === user.roleID) // 根据 roleID 获取角色信息
      return {
        code: 200,
        data: {
          list: ROLE.filter(e => e.level > role.level).map(role => ({
            ...role,
            users: USER.filter(user => role.roleID === user.roleID)
          })) // 取出当前角色表中等级低于自身的角色
        }
      }
    }
  },
  {
    url: '/admin/role/add', // 添加角色
    type: 'post',
    response: ({ query: { token }, body }) => {
      if (ROLE.find(e => e.rolename === body.rolename)) {
        return { code: 402, message: '当前角色名称与已有角色名称重复' }
      } else {
        const user = USER.find(e => e.username === decodeURIComponent(token)) // 根据 username 查询用户
        const role = ROLE.find(e => e.roleID === user.roleID) // 根据 roleID 获取角色信息
        ROLE.push({
          level: role.level + 1,
          routes: body.routes,
          roleID: Date.now().toString(),
          rolename: body.rolename,
          description: body.description
        })
        return { code: 200 }
      }
    }
  },
  {
    url: '/admin/role/del', // 删除角色
    type: 'get',
    response: ({ query: { roleID }}) => {
      ROLE.splice(ROLE.findIndex(e => e.roleID === roleID), 1)
      return { code: 200 }
    }
  },
  {
    url: '/admin/role/update', // 编辑角色
    type: 'post',
    response: ({ body }) => {
      if (ROLE.find(e => e.roleID === body.roleID).rolename !== body.rolename && ROLE.find(e => e.rolename === body.rolename)) {
        return { code: 402, message: '当前角色名称与已有角色名称重复' }
      } else {
        ROLE[ROLE.findIndex(e => e.roleID === body.roleID)] = body
        return { code: 200 }
      }
    }
  },
  {
    url: '/admin/user/all', // 获取角色列表
    type: 'get',
    response: ({ query: { token }}) => {
      const user = USER.find(e => e.username === decodeURIComponent(token)) // 根据 username 查询用户
      const role = ROLE.find(e => e.roleID === user.roleID) // 根据 roleID 获取角色信息
      return {
        code: 200,
        data: {
          list: USER.filter(user => ROLE.find(role => role.roleID === user.roleID).level > role.level).map(user => ({ // 取出当前用户表中等级低于自身的用户
            ...user,
            ...ROLE.find(role => role.roleID === user.roleID) // 同时带上用户角色信息
          }))
        }
      }
    }
  },
  {
    url: '/admin/user/add', // 添加账号
    type: 'post',
    response: ({ query: { token }, body }) => {
      if (USER.find(e => e.username === body.username)) {
        return { code: 402, message: '当前名称与已有账号名称重复' }
      } else {
        USER.push({
          userID: Date.now().toString(), // 用户 id
          roleID: ROLE.find(role => role.rolename === body.rolename).roleID, // 角色 id
          username: body.username, // 用户名
          password: body.password, // 用户密码
          introduction: body.introduction, // 用户简介
          avatar: body.avatar
        })
        return { code: 200 }
      }
    }
  },
  {
    url: '/admin/user/del', // 删除账号
    type: 'get',
    response: ({ query: { userID }}) => {
      USER.splice(USER.findIndex(e => e.userID === userID), 1)
      return { code: 200 }
    }
  },
  {
    url: '/admin/user/update', // 编辑角色
    type: 'post',
    response: ({ body }) => {
      if (USER.find(e => e.userID === body.userID).username !== body.username && USER.find(e => e.username === body.username)) {
        return { code: 402, message: '当前账号名称名称与已有账号名称重复' }
      } else {
        USER[USER.findIndex(e => e.userID === body.userID)] = {
          ...USER[USER.findIndex(e => e.userID === body.userID)],
          ...{
            avatar: body.avatar,
            username: body.username, // 用户名
            introduction: body.introduction, // 用户简介
            roleID: ROLE.find(role => role.rolename === body.rolename).roleID // 角色 id
          }
        }
        return { code: 200 }
      }
    }
  },
  {
    url: '/admin/dept/tree', // 获取部门 tree
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: DEPT
      }
    }
  },
  {
    url: '/admin/dept/update', // 获取部门 tree
    type: 'post',
    response: ({ body }) => {
      DEPT[0] = body.tree
      return { code: 200 }
    }
  }
]
