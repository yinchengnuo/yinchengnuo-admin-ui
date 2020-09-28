<template>
  <div :class="{ 'app-container': !showUI }" :style="{ height: $store.state.settings.tagsView ? 'calc(100vh - 84px)' : 'calc(100vh - 50px)' }">
    <template v-if="showUI">
      <el-switch v-model="role" style="position: absolute; top: 84px; left: 32px; z-index: 1; font-weight: bolder;" active-text=" " inactive-text="切换角色" inactive-color="#13ce66" />
      <component :is="role ? 'adminDashboard' : 'editorDashboard'" />
    </template>
    <template v-else>
      <div class="title">
        <img class="avatar" :src="avatar">
        <div class="text">
          <div class="name">您好：{{ name }}</div>
          <div class="welcome">欢迎使用{{ title }}</div>
        </div>
      </div>
      <el-card class="todo box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold;">待办事项</span>
          <el-button type="text" style="float: right; padding: 3px 0" @click="$router.push('personal')">编辑</el-button>
        </div>
        <div v-if="todo" v-html="todo" />
        <div v-else>暂无待办事项</div>
      </el-card>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { showUI, title } from '@/settings'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      title,
      showUI,
      role: true
    }
  },
  computed: {
    ...mapGetters(['name', 'todo', 'avatar'])
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background-image: url('../../assets/index/walk.gif');
  background-color: #e3e3e3;
  background-repeat: no-repeat;
  background-position: center;
  @include scrollBar();
  background-size: 50%;
  position: relative;
  overflow: auto;
  .title {
    height: 123px;
    @include flex();
    justify-content: flex-start;
    .avatar {
      width: 123px;
      height: 123px;
      border-radius: 50%;
      margin-right: 24px;
    }
    .text {
      font-size: 24px;
      @include flex(column);
      align-items: flex-start;
      .name {
        line-height: 2;
        font-size: 36px;
        font-weight: bold;
      }
    }
  }
  .todo {
    margin: 24px auto;
    border-radius: 12px;
    background:rgba(255, 255, 255, .8);
  }
}
</style>
