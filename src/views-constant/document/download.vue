<template>
  <div class="main-article">
    <aside v-show="!printing" style="margin-top:15px;">
      <div style="display: flex; justify-content: space-between;">
        <strong>文档下载页面（选择目标打印机为 [ 另存为 PDF ] 后点击保存即可）</strong>
        <el-button type="primary" @click="download">下载</el-button>
      </div>
      <a v-for="item in h2" :key="item.id" style="display: block" @click="window.scrollTo(0, item.offsetTop - item.offsetHeight)">{{ item.id }}</a>
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
      h2: [],
      title: 'yinchengnuo-admin-ui 说明文档'
    }
  },
  computed: {
    printing() {
      return this.$store.state.app.printing
    }
  },
  mounted() {
    document.title = this.title
    const afterprint = () => {
      this.$store.dispatch('app/togglePrinting', false)
    }
    window.addEventListener('afterprint', afterprint)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('afterprint', afterprint)
    })
    this.$alert('选择目标打印机为 [ 另存为 PDF ] 后点击保存即可', { showClose: false, closeOnClickModal: false, closeOnPressEscape: false }).then(() => {
      setTimeout(() => this.download(), 520)
    })
    this.h2 = Array.from(this.$refs.content.getElementsByTagName('h2'))
  },
  methods: {
    download() {
      this.$store.dispatch('app/togglePrinting', true)
      this.$nextTick(() => window.print())
    }
  }
}
</script>
