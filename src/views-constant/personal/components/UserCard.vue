<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">个人信息</div>

    <img v-img.base64="switchAvatar" :src="user.avatar" style="display: block; width: 120px; height: 120px; margin: 0 auto; border-radius: 50%;">
    <div class="text-center" style="margin: 8px; font-size: 24px;">{{ user.name }}</div>
    <div class="text-center" style="margin: 8px; font-size: 36px;">{{ user.role | uppercaseFirst }}</div>
    <div class="text-center" style="margin: 8px; font-size: 24px;">{{ user.dept }}</div>

  </el-card>
</template>

<script>
import { api_avatar } from '@/api/logon'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          role: '',
          dept: '',
          avatar: ''
        }
      }
    }
  },
  methods: {
    async switchAvatar([avatar]) {
      avatar = (await this.$compression(avatar, 200)).afterSrc // 压缩头像
      this.$request(api_avatar({ avatar }), () => {
        this.$store.dispatch('user/getInfo')
      })
    }
  }
}
</script>
