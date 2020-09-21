<template>
  <div class="app-container">
    <el-tabs>
      <el-tab-pane label="复制到剪切板">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="el-icon-document" @click="$copy(inputData)">复制</el-button>
      </el-tab-pane>
      <el-tab-pane label="复制到剪切板同时定义提示">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="el-icon-document" @click="$copy(inputData, inputData)">复制</el-button>
      </el-tab-pane>
      <el-tab-pane label="复制到剪切板同时没有提示">
        <el-input v-model="inputData" placeholder="Please input" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="el-icon-document" @click="$copy(inputData, false)">复制</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  name: 'Clipboard',
  data() {
    return {
      inputData: '绽放数据'
    }
  }
}
</script>

