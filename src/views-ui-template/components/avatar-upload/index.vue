<template>
  <div class="components-container">
    <aside>头像裁剪基于
      <a class="link-type" href="//github.com/dai-siki/vue-image-crop-upload"> vue-image-crop-upload</a>。
      由于我在使用时它只有 vue@1 版本，而且和 mockjs 不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。
    </aside>

    <pan-thumb :image="image" />

    <el-button type="primary" icon="el-icon-upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">
      换头像
    </el-button>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      @close="close"
      @crop-success="cropSuccess"
    />
  </div>
</template>

<script>
import ImageCropper from './ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  name: 'AvatarUpload',
  components: { ImageCropper, PanThumb },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
    }
  },
  methods: {
    cropSuccess(resData) {
      console.log(resData)
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>

<style scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>

