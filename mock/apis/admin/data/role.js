module.exports = [
  {
    level: 0, // 角色级别 0 最高，1， 2， 3 以此类推，低级别管理员在角色/账号管理中看不到高级别的角色账号
    routes: null, // 角色路由表（root 角色没有路由表，前端判断路由表为 null 即为拥有全部路由）
    roleID: '0', // 角色ID
    rolename: 'root', // 角色名 （root 角色角色名不可更改，同时不会在前端出现）
    description: '拥有最高权限' // 角色描述
  },
  {
    level: 1,
    routes: JSON.parse('[{"path":"/admin","children":[{"path":"user"},{"path":"role"},{"path":"dept"}]}]'),
    roleID: '1',
    rolename: '总经理',
    description: '拥有最高权限'
  },
  {
    level: 2,
    routes: JSON.parse('[{"path":"/admin","children":[{"path":"user"},{"path":"role"}]}]'),
    roleID: '2',
    rolename: '技术总监',
    description: '负责技术管理体系的建设和维护。'
  },
  {
    level: 2,
    routes: JSON.parse('[{"path":"/admin","children":[{"path":"user"},{"path":"role"}]}]'),
    roleID: '3',
    rolename: '运营总监',
    description: '计划、指导或协调公司或公共和私营机构的运营活动。'
  }
]
