<template>
  <div>
    <sticky :z-index="10" class-name="sub-navbar">
      <span style="float: left;line-hright: 84px;margin-left: 24px;color: white;">会吸附在距离顶部 0px 处</span>
      <el-dropdown trigger="click">
        <el-button plain>
          平台<i class="el-icon-caret-bottom el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown" class="no-border">
          <el-checkbox-group v-model="platforms" style="padding: 5px 15px;">
            <el-checkbox v-for="item in platformsOptions" :key="item.key" :label="item.key">
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click">
        <el-button plain>
          链接<i class="el-icon-caret-bottom el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown" class="no-padding no-border" style="width:300px">
          <el-input v-model="url" placeholder="请输入Url">
            <template slot="prepend">
              Url
            </template>
          </el-input>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="time-container">
        <el-date-picker v-model="time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="发表时间" />
      </div>

      <el-button style="margin-left: 10px;" type="success">发布</el-button>
    </sticky>

    <div class="components-container">
      <aside>吸顶, 当页面滚动到预设的位置会吸附在顶部</aside>
      <div v-for="item in 8" :key="item">占位文字</div>
      <sticky :sticky-top="240">
        <el-button type="primary">插槽组件实现吸顶，会吸附在距离顶部 240px 处（使用 position: sticky 实现）</el-button>
      </sticky>
      <div v-for="item in 8" :key="item + 99">占位文字</div>
      <el-button v-sticky="{ stickyTop: 320 }" type="primary">自定义指令实现吸顶，会吸附在距离顶部 320px 处（使用 onscroll + position: fixed 实现）</el-button>
      <div v-for="item in 96" :key="item + 999">占位文字</div>
    </div>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky'

export default {
  name: 'Sticky',
  components: { Sticky },
  data() {
    return {
      time: '',
      url: '',
      platforms: ['a-platform'],
      platformsOptions: [
        { key: 'a-platform', name: '平台A' },
        { key: 'b-platform', name: '平台B' },
        { key: 'c-platform', name: '平台C' }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  }
}
</script>

<style scoped>
.components-container div {
  line-height: 1.6;
}

.time-container {
  display: inline-block;
}
</style>
