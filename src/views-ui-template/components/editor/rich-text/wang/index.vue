<template>
  <div ref="editor" />
</template>

<script>
export default {
  props: {
    value: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    import('./wangEditor').then(wangEditor => {
      const Editor = wangEditor.default
      this.editor = new Editor(this.$refs.editor)
      this.editor.customConfig.uploadImgShowBase64 = true // 本地图片 base64 上传
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        // 'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        // 'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        // 'video', // 插入视频
        // 'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
      this.editor.customConfig.onchange = html => this.$emit('input', html) // 监听 onchange 事件
      this.editor.create()
      this.editor.txt.html(this.value.trim())
    })
  },
  methods: {}
}
</script>
