<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="{ name, role, dept, avatar }" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="待办事项" name="待办事项">
                <todo />
              </el-tab-pane>
              <el-tab-pane label="修改密码" name="修改密码">
                <password />
              </el-tab-pane>
              <!-- <el-tab-pane label="动态" name="动态">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="时间线" name="时间线">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="账号信息" name="账号信息">
                <account :user="user" />
              </el-tab-pane> -->
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Todo from './components/Todo'
import UserCard from './components/UserCard'
import Password from './components/Password'

export default {
  name: 'Profile',
  components: { UserCard, Todo, Password },
  data() {
    return {
      user: {},
      activeTab: '待办事项'
    }
  },
  computed: {
    ...mapGetters(['name', 'role', 'dept', 'avatar'])
  }
}
</script>
