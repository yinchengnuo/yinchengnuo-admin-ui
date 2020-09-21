<template>
  <div class="app-container">
    <el-row :gutter="8">
      <el-col :span="col">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>按钮</span>
          </div>
          <div style="height:100px;">
            <router-link class="pan-btn green-btn" to="/components/icon">图标</router-link>
          </div>
        </el-card>
      </el-col>

      <el-col :span="col">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Material input</span>
          </div>
          <div style="height:100px;">
            <el-form :model="demo" :rules="demoRules">
              <el-form-item prop="title">
                <md-input v-model="demo.title" icon="el-icon-search" name="title" placeholder="输入标题">标题</md-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>

      <el-col :span="col">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>图片hover效果</span>
          </div>
          <div class="component-item">
            <pan-thumb width="88px" height="88px" image="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191">
              {{ title }}
            </pan-thumb>
          </div>
        </el-card>
      </el-col>

      <el-col :span="col">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>水波纹效果</span>
          </div>
          <div class="component-item">
            <el-button v-waves type="primary">
              水波纹效果
            </el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="col">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>hover 文字</span>
          </div>
          <div class="component-item">
            <mallki class-name="mallki-text" :text="title" />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24" style="margin-top: 12px;">
        <div class="wrapper" style="height: 630px">
          <solar-system />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { title } from '@/settings'
import MdInput from '@/components/MDinput'
import PanThumb from '@/components/PanThumb'
import SolarSystem from '@/components/SolarSystem'
import Mallki from '@/components/TextHoverEffect/Mallki'

export default {
  name: 'Components',
  components: { PanThumb, MdInput, SolarSystem, Mallki },
  data() {
    const validate = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入六个字符'))
      } else {
        callback()
      }
    }
    return {
      col: 3,
      title,
      demo: {
        title: ''
      },
      demoRules: {
        title: [{ required: true, trigger: 'change', validator: validate }]
      }
    }
  }
}
</script>

<style scoped>
.app-container {
  background-color: #f0f2f5;
  min-height: calc(100vh - 84px);
}
.component-item{
  min-height: 100px;
}
</style>
