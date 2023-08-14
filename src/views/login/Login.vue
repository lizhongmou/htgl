<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<script lang="ts" setup>
import LoginPanel from './c-cnps/login-panel.vue'
</script>

<style scoped lang="less">
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets/img/login-bg.svg');
}
</style>
