<template>
  <div class="dashboard-editor-container">
    <div class=" clearfix">
      <pan-thumb :image="avatar" style="float: left">
        <span>你的角色：</span>
        <span class="pan-info-roles">{{ role }}</span>
      </pan-thumb>
      <div class="info-container">
        <span class="display_name">{{ name }}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;">您好，欢迎使用 {{ title }}</span>
      </div>
    </div>
    <div>
      <img src="@/assets/index/walk.gif" class="emptyGif">
    </div>
  </div>
</template>

<script>
import { title } from '@/settings'
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'

export default {
  name: 'DashboardEditor',
  components: { PanThumb },
  data() {
    return {
      title
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'role',
      'avatar'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .emptyGif {
    width: 45%;
    display: block;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    padding: 50px 60px 0px;
    background-color: #e3e3e3;
    .pan-info-roles {
      color: #333;
      display: block;
      font-size: 12px;
      font-weight: 700;
    }
    .info-container {
      height: 150px;
      position: relative;
      margin-left: 190px;
      line-height: 200px;
      .display_name {
        top: 25px;
        font-size: 48px;
        color: #212121;
        line-height: 48px;
        position: absolute;
      }
    }
  }
</style>
