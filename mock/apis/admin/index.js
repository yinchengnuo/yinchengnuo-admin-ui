const role = require('./data/role')
const user = require('./data/user')
const dept = require('./data/dept')

const USER = user
const ROLE = role
let DEPT = dept

module.exports = [
  {
    url: '/logon/login', // 用户登录
    type: 'post',
    response: ({ body: { username, password }}) => {
      const user = USER.find(e => e.username === username) // 根据 username 查询用户
      if (user && user.password === password) { // 用户存在且密码正确将 username 最为 token 返回
        return {
          code: 200,
          data: user.userID
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
      const user = USER.find(e => e.userID === token) // 根据 username 查询用户
      delete user.password
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
    url: '/logon/avatar', // 用户修改头像
    type: 'post',
    response: ({ query: { token }, body: { avatar }}) => {
      const user = USER.find(e => e.userID === token) // 获取用户信息
      user.avatar = avatar
      return { code: 200 }
    }
  },
  {
    url: '/logon/psw', // 用户修改密码
    type: 'post',
    response: ({ query: { token }, body: { oldpsw, newpsw }}) => {
      const user = USER.find(e => e.userID === token) // 获取用户信息
      if (user.password === oldpsw) {
        user.password = newpsw
        return { code: 200 }
      } else {
        return {
          code: 402,
          message: '旧密码不正确'
        }
      }
    }
  },
  {
    url: '/logon/todo', // 用户修改待办事项
    type: 'post',
    response: ({ query: { token }, body: { todo }}) => {
      USER.find(e => e.userID === token).todo = todo
      return { code: 200 }
    }
  },
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    url: '/admin/role/all', // 获取角色列表
    type: 'get',
    response: ({ query: { token }}) => {
      const user = USER.find(e => e.userID === token) // 获取角色的用户
      const role = ROLE.find(e => e.roleID === user.roleID) // 获取角色的角色
      return {
        code: 200,
        data: {
          list: ROLE.filter(e => e.parents.startsWith(`${role.parents},${role.roleID}`)).map(role => ({
            ...role,
            createname: USER.find(e => e.userID === role.createID) ? USER.find(e => e.userID === role.createID).username : '',
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
        const user = USER.find(e => e.userID === token) // 获取添加人信息
        const role = ROLE.find(e => e.roleID === user.roleID) // 获取添加人角色
        ROLE.push({
          routes: body.routes,
          createID: user.userID,
          rolename: body.rolename,
          roleID: Date.now().toString(),
          description: body.description,
          parents: `${role.parents},${role.roleID}`
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
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  {
    url: '/admin/user/all', // 获取用户列表
    type: 'get',
    response: ({ query: { token, dept, page, limit }}) => {
      const user = USER.find(e => e.userID === token) // 获取查询用户信息
      const role = ROLE.find(e => e.roleID === user.roleID) // 获取查询用户角色
      let total = 0
      return {
        code: 200,
        data: {
          list: USER.filter(user => { // 取出当前用户表中等级低于自身的用户
            return ROLE.find(role => role.roleID === user.roleID).parents.startsWith(`${role.parents},${role.roleID}`)
          }).filter(user => { // 取出指定部门的用户
            if (dept) { // 如果带有部门 id
              return dept.split(',').includes(user.deptID) // 返回部门 id 位于部门 id 中的
            } else { // 否则就是首次请求
              return true // 返回全部
            }
          }).map(e => { // 计算 total
            total++
            return e
          }).slice(limit * (page - 1), limit * page).map(user => { // 分页
            return {
              ...user,
              createname: USER.find(e => e.userID === user.createID) ? USER.find(e => e.userID === user.createID).username : '',
              ...ROLE.find(role => role.roleID === user.roleID) // 同时带上用户角色信息
            }
          }),
          total
        }
      }
    }
  },
  {
    url: '/admin/user/add', // 添加账号
    type: 'post',
    response: ({ query: { token }, body }) => {
      const user = USER.find(e => e.userID === token) // 获取添加人信息
      if (USER.find(e => e.username === body.username)) {
        return { code: 402, message: '当前名称与已有账号名称重复' }
      } else {
        USER.push({
          createID: user.userID, // 创建人信息
          deptID: body.deptID, // 部门 id
          avatar: body.avatar, // 用户头像
          roleID: body.roleID, // 用户角色 id
          deptname: body.deptname, // 部门名称
          username: body.username, // 用户名
          password: body.password, // 用户密码
          userID: Date.now().toString() // 用户 id
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
    url: '/admin/user/update', // 编辑账号
    type: 'post',
    response: ({ body }) => {
      if (USER.find(e => e.userID === body.userID).username !== body.username && USER.find(e => e.username === body.username)) {
        return { code: 402, message: '当前账号名称名称与已有账号名称重复' }
      } else {
        USER[USER.findIndex(e => e.userID === body.userID)] = body
        return { code: 200 }
      }
    }
  },
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      DEPT = body.tree
      return { code: 200 }
    }
  }
]
