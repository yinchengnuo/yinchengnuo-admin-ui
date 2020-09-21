<template>
  <div class="PageAccountManage">
    <el-button type="primary" style="margin-bottom: 8px;" @click="handleAddAccount">添加账号</el-button>

    <el-table :data="list" border>
      <el-table-column align="center" prop="avatar" label="头像">
        <template #default="{ row: { avatar, username } }">
          <img class="avatar" :src="avatar" :alt="username">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="username" label="名称" />
      <el-table-column align="center" prop="introduction" label="介绍" />
      <el-table-column align="center" prop="rolename" label="角色">
        <template #default="{ row: { rolename }}">
          <router-link :to="{ name: 'AdminRole', params: { rolename }}">
            <el-link type="primary">{{ rolename }}</el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" :disabled="scope.row.role === 'root'" @click="handleEditAccount(scope.row)">修改账号信息</el-button>
          <el-button v-if="$store.state.user.role === 'root'" type="danger" :disabled="scope.row.role === 'root'" @click="handleDeleteAccount(scope.row)">删除账号</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog width="321px" :visible.sync="dialogVisible" :close-on-click-modal="false" :destroy-on-close="true" :title="dialogType === 'add' ? '添加账号' : '编辑账号'">
      <el-form :model="account" label-width="48px" label-position="left">
        <div style="text-align: center;margin-bottom: 24px;">
          <el-avatar v-img.base64="([avatar]) => account.avatar = avatar" :size="66" :src="account.avatar" />
        </div>
        <el-form-item label="名称">
          <el-input v-model="account.username" maxlength="12" placeholder="名称" />
        </el-form-item>
        <el-form-item v-if="dialogType === 'add'" label="密码">
          <el-input v-model="account.password" maxlength="16" placeholder="密码" />
          <el-button type="primary" size="mini" @click="account.password = Date.now()">生成</el-button>
          <el-button type="primary" size="mini" @click="$copy(account.password)">复制</el-button>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="account.introduction" type="textarea" maxlength="48" placeholder="简介" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="account.rolename" placeholder="请选择角色">
            <el-option v-for="(item, index) in roleNameList" :key="index" :label="item.rolename" :value="item.rolename" />
          </el-select>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmAccount">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import avatar from './avatar'
import { api_getRole } from '@/api/admin/role'
import { api_getAcc, api_delAcc, api_addAcc, api_updateAcc } from '@/api/admin/user'
const account = { userID: '', avatar, password: '', username: '', introduction: '', rolename: '' }
export default {
  name: 'PageAccountManage',
  props: {},
  data() {
    return {
      account,
      list: [],
      roleList: [],
      dialogType: '',
      dialogVisible: false
    }
  },
  computed: {
    roleNameList() {
      return this.roleList.map(e => ({ rolename: e.rolename, roleID: e.roleID }))
    }
  },
  mounted() {
    this.getAccountRole() // 获取所有账号和角色
  },
  methods: {
    getAccountRole() { // 获取所有账户和角色
      this.$request([api_getAcc(), api_getRole()], ([data1, data2]) => {
        this.list = data1.list
        this.roleList = data2.list
      })
    },
    handleAddAccount() { // 点击添加账号
      this.account = Object.assign({}, account) // 将弹出框中的用户信息置为空
      this.dialogType = 'add' // 弹出框类型为添加账号
      this.dialogVisible = true // 弹出框
    },
    handleEditAccount({ userID, avatar, username, introduction, rolename }) { // 点击编辑账号
      this.account = Object.assign({}, { userID, avatar, username, introduction, rolename }) // 将弹出框中的用户信息置为空
      this.dialogType = 'edit' // 弹出框类型为编辑账号
      this.dialogVisible = true // 弹出框
    },
    confirmAccount() { // 点击提交添加/修改账号
      if (!this.account.username) { this.$message.info({ message: '请设置名称' }); return }
      if (this.dialogType === 'add' && !this.account.password) { this.$message.info({ message: '请设置密码' }); return }
      if (!this.account.rolename) { this.$message.info({ message: '请设置角色' }); return }
      if (this.account.avatar.length / 1024 > 1024) { this.$message.info({ message: '头像尺寸过大（base编码后大于 1M）' }); return }
      if (this.dialogType === 'add') {
        this.$request(api_addAcc(this.account), data => {
          this.$notify.success({ title: '添加成功', message: '账号名: ' + this.account.username })
          this.getAccountRole() // 添加成功后重新获取
          this.dialogVisible = false // 收起弹出框
        }, { endStillLoading: true })
      } else {
        this.$request(api_updateAcc(this.account), data => {
          this.$notify.success({ title: '编辑成功', message: '账号名: ' + this.account.username })
          this.getAccountRole() // 添加成功后重新获取
          this.dialogVisible = false // 收起弹出框
        }, { endStillLoading: true })
      }
    },
    handleDeleteAccount({ userID }) { // 点击删除
      this.$confirm('确定要删除当前账号？', '确定操作', { type: 'warning' }).then(() => {
        this.$request(api_delAcc({ userID }), data => {
          this.$message.success('删除成功')
          this.getAccountRole() // 删除成功后重新获取下角色列表
        }, { endStillLoading: true })
      }).catch(err => err)
    }
  }
}
</script>

<style lang="scss" scoped>
  .PageAccountManage {
    padding: 8px;
    box-sizing: border-box;
    .el-input {
      // width: 180px;
    }
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
</style>
