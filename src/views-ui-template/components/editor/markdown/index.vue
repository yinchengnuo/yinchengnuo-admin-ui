<template>
  <div class="components-container">
    <aside>Markdown 基于
      <a href="https://github.com/nhnent/tui.editor" target="_blank">tui.editor</a> 的简单封装。
      <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/feature/component/markdown-editor.html">文档 </a>
    </aside>

    <div class="editor-container">
      <el-tag class="tag-title">基本模式:</el-tag>
      <markdown-editor v-model="content1" language="zh_CN" height="300px" />
    </div>

    <div class="editor-container">
      <el-tag class="tag-title">Markdown 模式:</el-tag>
      <markdown-editor ref="markdownEditor" v-model="content2" language="zh_CN" :options="{ hideModeSwitch:true, previewStyle:'tab' }" height="200px" />
    </div>

    <div class="editor-container">
      <el-tag class="tag-title">自定义工具栏:</el-tag>
      <markdown-editor v-model="content3" language="zh_CN" :options="{ toolbarItems: ['heading','bold','italic'] }" />
    </div>

    <el-button style="margin-top:80px;" type="primary" icon="el-icon-document" @click="getHtml">获取 HTML</el-button>
    <div v-html="html" />
  </div>
</template>

<script>
import MarkdownEditor from './MarkdownEditor'

const content = `
**测试片段**

* vue
* element
* webpack

`
export default {
  name: 'Markdown',
  components: { MarkdownEditor },
  data() {
    return {
      content1: content,
      content2: content,
      content3: content,
      html: ''
    }
  },
  methods: {
    getHtml() {
      this.html = this.$refs.markdownEditor.getHtml()
    }
  }
}
</script>

<style scoped>
.editor-container{
  margin-bottom: 30px;
}
.tag-title{
  margin-bottom: 5px;
}
</style>
