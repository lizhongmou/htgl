<template>
  <div class="login-panel">
    <h1 class="title">管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activename">
        <!-- 1， 账号登录 -->
        <el-tab-pane name="account">
          <template v-slot:label>
            <div class="label">
              <el-icon><User /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <PaneAccount ref="accountRef" />
        </el-tab-pane>
        <!-- 账号注册 -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">注册账号</span>
            </div>
          </template>
          <PanePhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isrmemberpwd" label="记住密码" size="large" />
      <el-link type="warning">忘记密码</el-link>
    </div>
    <div class="login-btn">
      <el-row>
        <el-button
          type="success"
          class="login-btn"
          size="large"
          @click="activebtn"
          >立即登录</el-button
        >
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'
import { localCache } from '../../../utils/cache'

// get获取、set设置
const isrmemberpwd = ref<boolean>(localCache.getCache('isrmemberpwd') ?? false) // 记住密码
watch(isrmemberpwd, (newvalue) => {
  localCache.setCache('isrmemberpwd', newvalue)
})
const activename = ref('account') //默认选中这个
// 在vue里面拿到这个类，拿到定义的这个组件
// InstanceType<typeof PaneAccount> = PaneAccount。但是只能这样子拿到这个实例，不能直接使用PaneAccount这个拿
// typeof PaneAccount> 构造器；InstanceType<typeof PaneAccount> 拿到实例
const accountRef = ref<InstanceType<typeof PaneAccount>>()
function activebtn() {
  // 通过判断里面定义name的值来进行判断是哪一个操作，这个按键进行的什么操作
  if (activename.value === 'account') {
    accountRef.value?.loginAction(isrmemberpwd) //这样子就可以操作 PaneAccount这个组件
  } else if (activename.value === 'phone') {
    console.log('注册')
  } else {
    console.log('123')
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between; // 两边对齐
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    height: 40px;
    // --el-button-size: 50px;
    --el-color-success: pink;
    --el-button-text-color: hotpink;
  }
}
</style>
