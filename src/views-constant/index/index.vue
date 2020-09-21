<template>
  <div class="dashboard-container">
    <el-switch v-model="role" style="position: absolute;top:98px;left:32px;z-index:1;font-weight: bolder;" active-text=" " inactive-text="切换角色" inactive-color="#13ce66" />
    <component :is="role ? 'adminDashboard' : 'editorDashboard'" />
  </div>
</template>

<script>
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      role: true
      // currentRole: 'adminDashboard'
      // currentRole: 'editorDashboard'
    }
  }
}
</script>
