<template>
  <div class="password">
    <el-form ref="form" :model="form" :rules="rules" label-width="123px" style="width: 345px">
      <el-form-item label="旧密码：" prop="old">
        <el-input v-model="form.old" type="password" placeholder="请输入旧密码" maxlength="16" show-password autofocus />
      </el-form-item>
      <el-form-item label="新密码：" prop="new1">
        <el-input v-model="form.new1" type="password" placeholder="请输入新密码" maxlength="16" show-password />
      </el-form-item>
      <el-form-item label="重复新密码：" prop="new2">
        <el-input v-model="form.new2" type="password" placeholder="请再次输入新密码" maxlength="16" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { api_psw } from '@/api/logon'

export default {
  data() {
    return {
      form: {
        old: '',
        new1: '',
        new2: ''
      },
      rules: {
        old: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        new1: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        new2: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(val => {
        if (val) {
          if (this.form.new1 === this.form.new2) {
            this.$request(api_psw({
              oldpsw: this.form.old,
              newpsw: this.form.new1
            }), () => {
              this.form.old = this.form.new1 = this.form.new2 = ''
              this.$message.success('修改成功')
            })
          } else {
            this.$message.error('两次输入的新密码不一致')
          }
        }
      })
    }
  }
}
</script>
