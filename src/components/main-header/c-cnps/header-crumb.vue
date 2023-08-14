<template>
  <div class="curmb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'

const route = useRoute()
const userMenus = useLoginStore().userMenus
// 使用计算属性的方法对这个里面的数据进行路径与点击以后的事件相匹配
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>

<style lang="less" scoped>
.curmb {
  color: red;
}
</style>
