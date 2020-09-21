<template>
  <div class="PageRoleManage">
    <el-button type="primary" style="margin-bottom: 8px;" @click="handleAddRole">添加角色</el-button>
    <el-table :data="list" border>
      <el-table-column align="center" width="234" prop="rolename" label="角色名" />
      <el-table-column align="center" label="权限">
        <template slot-scope="{ row: { rolename, title, routes: tree }}">
          <el-popover
            trigger="click"
            :title="rolename"
            placement="right"
            popper-class="el-popover-tree"
          >
            <div class="tree-wrapper">
              <el-tree :data="tree" :props="{ children: 'children', label: item => item.meta ? item.meta.title : '' }" :default-expand-all="true" />
            </div>
            <div slot="reference" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;cursor: pointer;">
              <el-tag v-for="(value, index) in title" :key="index" style="margin: 2px;">{{ value }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="description" label="描述" />
      <el-table-column align="center" label="人员">
        <template slot-scope="{ row: { rolename, users }}">
          <el-popover
            v-if="users.length"
            trigger="click"
            popper-class="el-popover-tree"
            :title="rolename + '：共' + users.length + '人'"
          >
            <div class="tree-wrapper">
              <div v-for="(user, index) in users" :key="index" style="display: flex; margin: 8px;cursor: pointer;">
                <img :src="user.avatar" style="width: 40px;height: 40px;border-radius: 10px;">
                <span style="line-height: 40px;margin: 0 8px;">{{ user.username }}</span>
              </div>
            </div>
            <div slot="reference" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;cursor: pointer;">
              <el-tag v-for="(user, index) in users" :key="index" style="margin: 2px;">{{ user.username }}</el-tag>
            </div>
          </el-popover>
          <template v-else>暂无人员</template>
        </template>
      </el-table-column>
      <el-table-column align="center" width="234" label="操作">
        <template slot-scope="{ row }">
          <el-button type="primary" size="small" @click="handleEditRole(row)">编辑角色权限</el-button>
          <el-button type="danger" size="small" @click="handleDeleteRole(row)">删除角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" :destroy-on-close="true" :title="dialogType === 'add' ? '添加角色' : '编辑角色'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="角色名">
          <el-input v-model="role.rolename" maxlength="12" placeholder="角色名" />
        </el-form-item>
        <div class="el-form-item-wrapper">
          <el-form-item label="页面权限">
            <el-tree
              ref="tree"
              class="permission-tree"
              :data="routes"
              :props="{ children: 'children', label: 'title' }"
              show-checkbox
              accordion
              :indent="48"
              highlight-current
              node-key="path"
              icon-class="el-icon-caret-right"
              :render-content="renderContent"
              @node-click="({ buttons }) => buttonPermission = buttons"
            />
          </el-form-item>
          <el-form-item v-if="buttonPermission.length" label="按钮权限">
            <el-table :data="buttonPermission" size="mini" stripe border>
              <el-table-column align="center" label="开启权限">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.permission" />
                </template>
              </el-table-column>
              <el-table-column align="center" label="按钮名称">
                <template slot-scope="scope">{{ scope.row.label }}</template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>
        <el-form-item label="角色描述">
          <el-input v-model="role.description" type="textarea" :rows="2" placeholder="请输入角色描述" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="danger" @click="handleCloseDialog">取消</el-button>
        <el-button type="primary" @click="confirmRole">{{ dialogType === 'add' ? '确认添加' : '确认编辑' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { api_getRole, api_addRole, api_delRole, api_updateRole } from '@/api/admin/role'

export default {
  name: 'AdminRole',
  data() {
    return {
      role: { id: '', rolename: '', routes: [], description: '' },
      list: [],
      dialogType: '',
      dialogVisible: false,
      buttonPermission: [],
      routes: this.generateRoutes(deepClone(this.$store.state.permission.permissionRoutes))
    }
  },
  mounted() {
    this.getRole(() => { // 传递函数进入等待渲染完毕如果从角色管理点击角色进入就触发响应权限点击显示预览权限树
      if (this.$route.params.rolename) {
        const index = this.list.findIndex(e => e.rolename === this.$route.params.rolename)
        if (index >= 0) {
          this.$nextTick(() => {
            document.querySelectorAll('td:nth-child(2)')[index].getElementsByClassName('el-popover__reference')[0].click()
          })
        }
      }
    }) // 获取所有角色
  },
  methods: {
    renderContent(h, { node, data: { meta, hidden, buttons }}) { // 自定义 tree 选项
      const style = 'color: red;margin-left: 8px;font-style: oblique;font-size: 8px;font-weight: bold;'
      return (
        <span>
          {
            meta.icon
              ? meta.icon.includes('el-icon') ? <i class={meta.icon} style='margin-right: 8px;' />
                : <svg-icon icon-class={meta.icon} style='margin-right: 8px;' />
              : null
          }
          <span>{ node.label }</span>
          { hidden && <span style={style}>* 不在侧边栏显示</span> }
          { buttons.length > 0 ? <span style={style}>** 有权控按钮</span> : null }
        </span>
      )
    },
    getRole(popover) { // 获取角色方法
      this.$request(api_getRole(), ({ list }) => {
        list.forEach(role => {
          this.reductionRoutes(role.routes, deepClone(this.$store.state.permission.permissionRoutes)) // 根据后端路由表还原前端路由
          role.title = JSON.stringify(role.routes).match(/(?<=title":").+?(?=")/g)
        })
        this.list = list
        popover && popover()
      })
    },
    handleAddRole() { // 点击添加角色
      this.role = Object.assign({}, { id: '', rolename: '', routes: [], description: '' }) // 将弹出框中的用户信息置为空
      this.dialogType = 'add' // 弹出框类型为添加用户
      this.$nextTick(() => { // nextTick是为了在弹出框首次打开之后再获取权限Tree
        this.$refs.tree.setCheckedNodes([]) // 清除已选中的权限Tree
      })
      this.dialogVisible = true // 弹出框
    },
    handleEditRole(row) { // 点击编辑角色
      this.dialogType = 'edit' // 弹出框类型为编辑用户
      this.role = deepClone(row) // 弹出框中的用户信息为当前行的用户信息，deepclone 之后权限Tree和用户信息互不干扰
      const mergeButtonpermission = (target, origin) => { // 将按钮权限合并到权限 tree 上。递归写到🤮
        origin.forEach(originItem => {
          target.forEach(targetItem => {
            if (targetItem.path === originItem.path) {
              targetItem.buttons = originItem.buttons
              if (targetItem.children && originItem.children) {
                mergeButtonpermission(targetItem.children, originItem.children)
              }
            }
          })
        })
      }
      mergeButtonpermission(this.routes, this.generateRoutes(deepClone(this.role.routes)))
      this.dialogVisible = true // 弹出框
      this.$nextTick(() => { // nextTick是为了在弹出框首次打开之后再获取权限Tree
        const treeChecked = this.generateArr(this.generateRoutes(this.role.routes))
        for (let i = treeChecked.length - 1; i >= 0; i--) {
          if (treeChecked[i].children) {
            treeChecked.splice(i, 1)
          }
        }
        this.$refs.tree.setCheckedNodes(treeChecked) // 将权限Tree的选中项设置为角色的路由项
      })
    },
    handleCloseDialog() { // 点击关闭添加/编辑弹窗
      this.dialogVisible = false // 隐藏弹窗
      this.buttonPermission = [] // 删除按钮权限表格
      const delButtonpermission = target => { // 将权限 tree 上的按钮权限删除 递归写到🤮
        target.forEach(targetItem => {
          targetItem.buttons = []
          if (targetItem.children) {
            delButtonpermission(targetItem.children)
          }
        })
      }
      delButtonpermission(this.routes)
      setTimeout(() => {
        this.routes = this.generateRoutes(deepClone(this.$store.state.permission.permissionRoutes))
      }, 321)
    },
    confirmRole() { // 点击提交添加/修改角色
      if (!this.role.rolename) { this.$message.info({ message: '请设置角色名' }); return } // 检测是否填写角色名
      const checkedKeys = this.$refs.tree.getCheckedKeys() // 获取权限 Tree 中已选中部分的 key 值
      const checkedNodes = this.$refs.tree.getCheckedNodes() // 获取权限 Tree 中已选中部分的 val 值
      this.role.routes = this.generateTree(deepClone(this.$store.state.permission.permissionRoutes), '/', checkedKeys, checkedNodes) // 根据已选中的部分格式化路由表
      if (this.dialogType === 'edit') { // 如果是编辑角色
        this.$request(api_updateRole(this.role), data => {
          this.$notify.success({ title: '修改成功', message: '角色名: ' + this.role.rolename })
          this.getRole() // 添加成功后重新获取下角色列表
          this.handleCloseDialog() // 收起弹出框
        }, { endStillLoading: true })
      } else if (this.dialogType === 'add') { // 如果是添加角色
        this.$request(api_addRole(this.role), data => {
          this.$notify.success({ title: '添加成功', message: '角色名: ' + this.role.rolename })
          this.getRole() // 添加成功后重新获取下角色列表
          this.handleCloseDialog() // 收起弹出框
        }, { endStillLoading: true })
      }
    },
    handleDeleteRole({ roleID, users }) { // 点击删除角色
      if (users.length) { this.$message.warning('当前角色账号数量不为 0 无法删除'); return }
      this.$confirm('确定要删除当前角色？', '确定操作', { type: 'warning' }).then(() => {
        this.$request(api_delRole({ roleID }), data => {
          this.$message.success('删除成功')
          this.getRole() // 删除成功后重新获取下角色列表
        }, { endStillLoading: true })
      })
    },
    generateRoutes(routes, basePath = '/') { // 序列化路由
      const res = [] // 序列化后的路由表
      for (const route of routes) { // 遍历路由表
        const data = {
          name: route.name,
          meta: route.meta || {},
          hidden: Boolean(route.hidden),
          title: route.meta && route.meta.title,
          path: path.resolve(basePath, route.path),
          buttons: (route.buttons || []).map(button => ({ ...button, permission: Boolean(button.permission) }))
        }
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) { // 序列化角色路由
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    generateTree(routes, basePath = '/', checkedKeys, checkedNodes) { // 将前端路由表转换为后端路由表
      const res = []
      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys, checkedNodes)
        }
        if (checkedKeys.includes(routePath) || (route.children && route.children.length)) {
          if (checkedKeys.includes(routePath)) { // 将按钮权限数组清洗为一个简单的字符串数组
            route.buttons = checkedNodes[checkedKeys.indexOf(routePath)].buttons.filter(button => button.permission).map(button => button.name)
          }
          Object.keys(route).forEach(key => {
            if (key !== 'path' && key !== 'children' && key !== 'buttons') { // 清除要存往后端的路由表的冗余字段，只保留 path children buttons 三个字段
              Reflect.deleteProperty(route, key)
            }
          })
          if (route.buttons && !route.buttons.length) { // 清除空的 buttons 字段
            Reflect.deleteProperty(route, 'buttons')
          }
          res.push(route)
        }
      }
      return res
    },
    reductionRoutes(target, origin) { // 将后端路由表转换为前端路由表
      origin.forEach(originItem => {
        target.forEach(targetItem => {
          if (originItem.path === targetItem.path) {
            Object.keys(originItem).forEach(originItemKey => {
              if (originItemKey !== 'children') { // 不转换 children
                if (originItemKey === 'buttons') {
                  targetItem.buttons = originItem.buttons.map(button => {
                    return {
                      ...button,
                      permission: (targetItem.buttons || []).includes(button.name)
                    }
                  })
                } else {
                  targetItem[originItemKey] = originItem[originItemKey]
                }
              }
            })
            if (targetItem.children && originItem.children) {
              this.reductionRoutes(targetItem.children, originItem.children)
            }
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .PageRoleManage {
    padding: 8px;
    box-sizing: border-box;
    .el-input {
      width: 200px;
    }
    .el-form-item-wrapper {
      display: flex;
      .el-form-item {
        flex: 1;
      }
    }
  }
</style>
