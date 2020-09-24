import Layout from '@/layout'
// import user from '@/api/admin/user'
// import role from '@/api/admin/role'

// console.log(Object.values(user))
// console.log(Object.values(role))

export default {
  name: 'Admin',
  path: '/admin',
  component: Layout,
  redirect: '/admin/role',
  meta: { title: '后台管理', icon: 'el-icon-s-tools' },
  children: [
    {
      path: 'user',
      name: 'AdminUser',
      meta: { title: '账号管理', noCache: true, icon: 'user' },
      component: () => import('@/views/admin/user')
    },
    {
      path: 'role',
      name: 'AdminRole',
      meta: { title: '角色管理', noCache: true, icon: 'peoples' },
      component: () => import('@/views/admin/role')
    },
    // {
    //   path: 'post',
    //   name: 'AdminPost',
    //   meta: { title: '岗位管理', noCache: true, icon: 'form' },
    //   component: () => import('@/views/admin/post')
    // },
    {
      path: 'dept',
      name: 'AdminDept',
      meta: { title: '部门管理', noCache: true, icon: 'tree' },
      component: () => import('@/views/admin/dept')
    }
  ]
}
