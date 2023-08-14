<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
// 默认是英文，在这里使用中文，但是vue不识别mjs文件，因此需要单独声明一下
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  /* background-color: pink; */
}
</style>
