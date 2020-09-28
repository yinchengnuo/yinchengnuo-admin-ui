<template>
  <div class="todo">
    <tinymce v-model="content" :height="456" />
    <el-button type="danger" style="margin-top: 8px" @click="content = '';save()">清空</el-button>
    <el-button type="primary" style="margin-top: 8px" @click="save">保存</el-button>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { api_todo } from '@/api/logon'

export default {
  components: { Tinymce },
  data() {
    return {
      content: ''
    }
  },
  mounted() {
    this.content = this.$store.getters.todo
  },
  methods: {
    save() {
      this.$request(api_todo({ todo: this.content }), () => {
        this.$message.success('保存成功')
        this.$store.dispatch('user/getInfo')
      })
    }
  }
}
</script>
