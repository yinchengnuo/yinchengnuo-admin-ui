module.exports = [
  {
    routes: null, // 角色路由表（root 角色没有路由表，前端判断路由表为 null 即为拥有全部路由）
    roleID: '0', // 角色ID
    parents: '', // 父级角色们
    createID: '', // 创建人 ID
    rolename: 'root', // 角色名 （root 角色角色名不可更改，同时不会在前端出现）
    description: '拥有最高权限' // 角色描述
  },
  // {
  //   roleID: '1',
  //   createID: '0',
  //   parents: ',0',
  //   rolename: '总经理',
  //   description: '负责全面组织实施董事会的有关决议和规定。',
  //   routes: JSON.parse('[{"path":"/admin","children":[{"path":"user"},{"path":"role"},{"path":"dept"}]}]')
  // },
  // {
  //   roleID: '2',
  //   createID: '1',
  //   parents: ',0,1',
  //   rolename: '技术总监',
  //   description: '负责技术管理体系的建设和维护。',
  //   routes: JSON.parse('[{"path":"/admin","children":[{"path":"user"},{"path":"role"}]}]')
  // },
  // {
  //   roleID: '3',
  //   createID: '1',
  //   parents: ',0,1',
  //   rolename: '运营总监',
  //   description: '计划、指导或协调公司的运营活动。',
  //   routes: JSON.parse('[{"path":"/admin","children":[{"path":"user"},{"path":"role"}]}]')
  // }
]
