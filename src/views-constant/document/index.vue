<template>
  <div class="app-container document" :class="{ 'main-article' : printing }">
    <aside v-show="!printing">
      这里展示了项目源码中 README.md 的内容。
      此处使用了 markdown-loader 和 html-loader 实现了将 markdown 渲染为 HTML 功能，具体配置在 vue.config.js。
      在这里我们使用 window.print() 实现了将文档下载为 PDF 功能（选择目标打印机为 [ 另存为 PDF ] 后点击保存即可）。同时这里提供了两种下载实现，分别是：
      <el-button type="primary" size="mini" @click="download">在当前窗口将文档保存为 PDF</el-button>
      和
      <el-button type="primary" size="mini" @click="$router.push('/pdf/download')">在新的窗口将文档保存为 PDF</el-button>。
      具体的使用和实现差异见 <a @click="window.scrollTo(0, document.getElementById('portal').offsetTop - document.getElementById('portal').offsetHeight - 84)">下方 portal</a> 项目文档。
      <a v-for="item in h2" :key="item.id" style="display: block" @click="window.scrollTo(0, item.offsetTop - item.offsetHeight - 84)">{{ item.id }}</a>
    </aside>
    <div ref="content" class="node-article-content" v-html="README" />
    <back-to-top />
  </div>
</template>

<script>
import README from '../../../README.md'
import BackToTop from '@/components/BackToTop'
export default {
  components: { BackToTop },
  data() {
    return {
      README,
      h2: []
    }
  },
  computed: {
    printing() {
      return this.$store.state.app.printing
    }
  },
  mounted() {
    const afterprint = () => {
      this.$store.dispatch('app/togglePrinting', false)
    }
    window.addEventListener('afterprint', afterprint)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('afterprint', afterprint)
    })
    this.printing && window.print()
    setTimeout(() => window.scrollTo(0, 9999999))
    this.h2 = Array.from(this.$refs.content.getElementsByTagName('h2'))
  },
  methods: {
    download() {
      this.$store.dispatch('app/togglePrinting', true)
    }
  }
}
</script>
