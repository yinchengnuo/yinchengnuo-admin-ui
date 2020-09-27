<template>
  <div class="PageAccountManage">
    <div class="left">
      <el-input
        v-model.trim="filterText"
        size="mini"
        placeholder="输入部门名称进行过滤"
      />

      <el-tree
        ref="tree"
        class="filter-tree"
        :data="tree"
        default-expand-all
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        @node-click="switchDept"
      />
    </div>
    <div class="right">
      <el-button type="primary" style="margin-bottom: 8px;" size="mini" @click="handleAddAccount">添加账号</el-button>

      <el-table :data="list" border>
        <el-table-column align="center" prop="avatar" label="头像">
          <template #default="{ row: { avatar, username } }">
            <img class="avatar" :src="avatar" :alt="username">
          </template>
        </el-table-column>
        <el-table-column align="center" prop="username" label="名称" />
        <el-table-column align="center" prop="deptname" label="部门" />
        <el-table-column align="center" prop="rolename" label="角色">
          <template #default="{ row: { rolename }}">
            <router-link :to="{ name: 'AdminRole', params: { rolename }}">
              <el-link type="primary">{{ rolename }}</el-link>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createname" label="创建人" />
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEditAccount(scope.row)">修改账号信息</el-button>
            <el-button type="danger" size="mini" @click="handleDeleteAccount(scope.row)">删除账号</el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination :total="page.total" :limit="page.limit" @pagination="pagination" />

      <el-dialog width="666px" :visible.sync="dialogVisible" :destroy-on-close="true" :title="dialogType === 'add' ? '添加账号' : '编辑账号'">
        <el-form ref="dialog-form" :model="account" label-width="88px" label-position="left" inline :rules="rules">
          <div style="text-align: center;margin-bottom: 24px;">
            <el-avatar v-img.base64="([avatar]) => account.avatar = avatar" :size="66" :src="account.avatar" />
            <div>点击头像选择</div>
          </div>
          <el-form-item label="用户名称" prop="username">
            <el-input v-model.trim="account.username" maxlength="12" placeholder="请输入用户名称" />
          </el-form-item>
          <el-form-item label="归属部门" prop="deptID">
            <treeselect
              v-model.trim="account.deptID"
              :options="tree"
              :show-count="true"
              :disable-branch-nodes="true"
              placeholder="请选择归属部门"
              style="width: 200px"
              @select="({ label }) => account.deptname = label"
            />
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input v-model.trim="account.password" maxlength="16" type="password" show-password placeholder="请输入用户密码" style="width: 185px" />
          </el-form-item>
          <el-form-item label="用户角色" prop="roleID">
            <el-select v-model.trim="account.roleID" placeholder="请选择用户角色">
              <el-option v-for="(item, index) in roleList" :key="index" :label="item.rolename" :value="item.roleID" />
            </el-select>
          </el-form-item>
        </el-form>
        <div style="text-align:right;">
          <el-button type="danger" @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="confirmAccount">确定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import avatar from './avatar'
import { api_getDept } from '@/api/admin/dept'
import { api_getRole } from '@/api/admin/role'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { api_getAcc, api_delAcc, api_addAcc, api_updateAcc } from '@/api/admin/user'
const account = {
  avatar,
  userID: '',
  roleID: '',
  deptID: null,
  deptname: '',
  password: '',
  username: ''
}
export default {
  name: 'PageAccountManage',
  components: { Treeselect },
  props: {},
  data() {
    return {
      account,
      tree: [],
      filterText: '',
      list: [],
      roleList: [],
      dialogType: '',
      dialogVisible: false,
      deptID: '1',
      page: {
        page: 1,
        total: 0,
        limit: 20
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        deptID: [
          { required: true, message: '请选择归属部门', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ],
        roleID: [
          { required: true, message: '请选择用户角色', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    filterText(val) { // 过滤部门 tree 关键词
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.$request(api_getDept(), tree => { // 获取部门 tree
      this.tree = tree
    })
    this.getAccountRoleDept() // 获取所有账号和角色和部门
  },
  methods: {
    switchDept({ id }) { // 切换部门
      console.log(id)
    },
    pagination() { // 切换分页
      console.log(123)
    },
    filterNode(value, data) { // 部门 tree 根据关键词过滤规则
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getAccountRoleDept() { // 获取所有账户和角色和部门
      this.$request([api_getAcc({ dept: this.deptID, page: this.page.page, limit: this.page.limit }), api_getRole(), api_getDept()], ([data1, data2, date3]) => {
        this.tree = date3
        this.list = data1.list
        this.roleList = data2.list
      })
    },
    handleAddAccount() { // 点击添加账号
      this.account = Object.assign({}, account) // 将弹出框中的用户信息置为空
      this.dialogType = 'add' // 弹出框类型为添加账号
      this.dialogVisible = true // 弹出框
    },
    handleEditAccount(info) { // 点击编辑账号
      this.account = Object.assign({}, info) // 将弹出框中的用户信息置为用户信息
      this.dialogType = 'edit' // 弹出框类型为编辑账号
      this.dialogVisible = true // 弹出框
    },
    confirmAccount() { // 点击提交添加/修改账号
      this.$refs['dialog-form'].validate(async valid => { // 表单验证
        if (valid) {
          this.__loading = this.$loading()
          if (this.account.avatar.length / 1024 > 100) { // 如果图片过大
            const { afterSrc } = await this.$compression(this.account.avatar, 100, 6) // 压缩头像
            this.account.avatar = afterSrc
            console.log(this.account.avatar)
          }
          this.$message.info('图片压缩完毕')
          this.__loading.close()
          if (this.dialogType === 'add') { // 如果是添加用户
            this.$request(api_addAcc(this.account), data => {
              this.$notify.success({ title: '添加成功', message: '用户名称: ' + this.account.username })
              this.getAccountRoleDept() // 添加成功后重新获取
              this.dialogVisible = false // 收起弹出框
            }, { endStillLoading: true })
          } else { // 如果是编辑用户
            this.$request(api_updateAcc(this.account), data => {
              this.$notify.success({ title: '编辑成功', message: '用户名称: ' + this.account.username })
              this.getAccountRoleDept() // 添加成功后重新获取
              this.dialogVisible = false // 收起弹出框
            }, { endStillLoading: true })
          }
        }
      })
    },
    handleDeleteAccount({ userID }) { // 点击删除
      this.$confirm('确定要删除当前账号？', '确定操作', { type: 'warning' }).then(() => {
        this.$request(api_delAcc({ userID }), data => {
          this.$message.success('删除成功')
          this.getAccountRoleDept() // 删除成功后重新获取下角色列表
        }, { endStillLoading: true })
      }).catch(err => err)
    }
  }
}
</script>

<style lang="scss" scoped>
  .PageAccountManage {
    padding: 8px;
    @include flex();
    box-sizing: border-box;
    align-items: flex-start;
    .el-avatar {
      box-shadow: 0 0 8px #aaaaaa;
    }
    .left {
      width: 222px;
      margin-right: 8px;
    }
    .right {
      flex: 1;
      .el-table {
        ::v-deep {
          .cell {
            overflow: visible;
          }
        }
      }
      .avatar {
        width: 36px;
        z-index: 999;
        height: 36px;
        position: relative;
        border-radius: 8px;
        transition: transform .5s;
      }
      .avatar:hover {
        transform: scale(1.5, 1.5)
      }
    }
  }
</style>
