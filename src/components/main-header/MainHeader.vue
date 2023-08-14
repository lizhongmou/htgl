<template>
  <div class="mainheader">
    <div class="menu-icon" @click="changeIcon">
      <el-icon size="25px"
        ><component :is="isFold ? 'Expand' : 'Fold'"
      /></el-icon>
    </div>
    <div class="content">
      <header-info />
      <HeaderCrumb />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import HeaderCrumb from './c-cnps/header-crumb.vue'
import HeaderInfo from './c-cnps/HeaderInfo.vue'
// 0.内部自定义事件
const emit = defineEmits(['foldChange'])

const isFold = ref<boolean>(false) // 控制使用那个图标
function changeIcon() {
  isFold.value = !isFold.value // 改变icon
  // 父子组件通信
  emit('foldChange', isFold.value) // 2.将事件和状态传递给父组件
}
</script>

<style scoped lang="less">
.mainheader {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
