<template>
  <div>
    <svg-icon icon-class="guide" @click.prevent.stop="guide" />
  </div>
</template>

<script>
import steps from './steps'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

export default {
  name: 'Guide',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new Driver({
      doneBtnText: '完成',
      closeBtnText: '关闭',
      nextBtnText: '下一步',
      prevBtnText: '上一步'
    })
  },
  methods: {
    guide() {
      window.scroll(0, 0)
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
</script>

<style>
div#driver-highlighted-element-stage, div#driver-page-overlay {
  background: transparent !important;
  outline: 5000px solid rgba(0, 0, 0, .75)
}
</style>
