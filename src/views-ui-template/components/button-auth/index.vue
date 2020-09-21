<template>
  <div class="app-container button-auth-control">
    <span>* 按钮为主题色即为有权限，灰色即无权限。在实际项目中，大部分情况下，无权限的按钮应该被移出 Dom 树</span>
    <div>
      <el-button v-button-auth-control:search type="primary">搜索</el-button>
      <el-button v-button-auth-control:add type="primary">添加</el-button>
      <el-button v-button-auth-control:edit type="primary">编辑</el-button>
      <el-button v-button-auth-control:del type="primary">删除</el-button>
      <el-button v-button-auth-control:batch type="primary">批量</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonAuth'
}
</script>

<style lang="scss" scoped>
  .button-auth-control {
    padding: 8px;
    display: flex;
    height: 567px;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: center;
    >span {
      line-height: 66px;
    }
  }
</style>
