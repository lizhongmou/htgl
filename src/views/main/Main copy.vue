<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main">
    <button @click="changes">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import LoginToken from '../../global/constants'

import { localCache } from '../../utils/cache'
const router = useRouter()
function changes() {
  // 1. 删除token
  localCache.removeCache(LoginToken)
  // 跳回到login
  router.push('/login')
}
</script>

<style scoped lang="less">
.main {
  width: 100vw;
  height: 100vh;
}
</style>
