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
    routes: JSON.parse('[{"path":"/pages","children":[{"path":"charts","children":[{"path":"keyboard"},{"path":"line"},{"path":"mix-chart"}]},{"path":"table","children":[{"path":"complex-table"},{"path":"dynamic-table"},{"path":"drag-table"},{"path":"inline-edit-table"}]},{"path":"excel","children":[{"path":"export-excel"},{"path":"export-selected-excel"},{"path":"export-merge-header"},{"path":"upload-excel"}]},{"path":"example","children":[{"path":"list"},{"path":"create"},{"path":"edit/:id"}]},{"path":"zip","children":[{"path":"download"}]},{"path":"tab","children":[{"path":""}]},{"path":"error-log"}]},{"path":"/components","children":[{"path":"icon"},{"path":"button-auth","buttons":["add","edit","search"]},{"path":"editor","children":[{"path":"rich-text"},{"path":"markdown"},{"path":"json"}]},{"path":"clipboard"},{"path":"split-pane"},{"path":"avatar-upload"},{"path":"sticky"},{"path":"count-to"},{"path":"mixin"},{"path":"back-to-top"},{"path":"drag-dialog"},{"path":"dropzone"},{"path":"drag-tags"},{"path":"dnd-list"},{"path":"drag-kanban"}]},{"path":"/admin","children":[{"path":"role"},{"path":"user"}]}]'),
    roleID: '1',
    rolename: '技术总监',
    description: '负责技术管理体系的建设和维护，对技术和业务具有深入理解，对行业技术发展趋势和管理现状具有准确的判断。'
  },
  {
    level: 1,
    routes: JSON.parse('[{"path":"/components","children":[{"path":"icon"},{"path":"button-auth","buttons":["add","edit","search"]},{"path":"editor","children":[{"path":"rich-text"},{"path":"markdown"},{"path":"json"}]},{"path":"clipboard"},{"path":"split-pane"},{"path":"avatar-upload"},{"path":"sticky"},{"path":"count-to"},{"path":"mixin"},{"path":"back-to-top"},{"path":"drag-dialog"},{"path":"dropzone"},{"path":"drag-tags"},{"path":"dnd-list"},{"path":"drag-kanban"}]},{"path":"/admin","children":[{"path":"role"},{"path":"user"}]}]'),
    roleID: '2',
    rolename: '运营总监',
    description: '计划、指导或协调公司或公共和私营机构的运营活动。职责包括制定政策、管理日常活动、对物资和人力资源使用进行计划。包括负责日常管理工作的小商业机构的业主或经理。'
  }
]
