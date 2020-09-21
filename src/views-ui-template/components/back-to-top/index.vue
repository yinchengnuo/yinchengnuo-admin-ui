<template>
  <div class="components-container">
    <aside>页面滚动到指定位置会在右下角出现返回顶部按钮</aside>
    <aside>可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素</aside>
    <div class="placeholder-container">
      <div v-for="item in 100" :key="item">placeholder</div>
    </div>
    <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" transition-name="fade" />
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'

export default {
  name: 'BackToTop',
  components: { BackToTop },
  data() {
    return {
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中
        background: '#e7eaf1'// 按钮的背景颜色
      }
    }
  }
}
</script>

<style scoped>
.placeholder-container div {
  margin: 10px;
}
</style>
