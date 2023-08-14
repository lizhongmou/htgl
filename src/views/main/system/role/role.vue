<template>
  <div class="role">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <!--  :other-info="otherInfo"传递额外的值，相当于把这个组件里面获得的id传递给 page-module组件里面去 -->
    <page-modal
      :modal-config="modalConfig"
      :other-info="otherInfo"
      ref="modalRef"
    >
      <!-- 使用插槽 -->
      <template #menulist>
        <!-- 设置节点数
        @check点击了复选框触发
        ref 也是关键
        -->
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElTreeCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'
import type { ElTree } from 'element-plus'

import PageSearch from '@/components/page-search/page-search.vue'
import searchConfig from './config/search.config'

import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'

import PageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'
import { mapMenuListToIds } from '@/utils/map-menus'

// 逻辑关系，进行隐藏与点击以后的事件
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
// 拿到每一个hooks，然后回调里面的函数
// 将 editCallback 做为参数传递过去
const { modalRef, handleNewClick, handleEditClick } = usePageModal(
  newCallback,
  editCallback
)

// 获取完整的菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
const otherInfo = ref({}) // 额外传递的数据，传递的是这个里面获得的id
// v3 copy/src/components/page-modal/page-modal.vue 传递到这里
// 选择复选框以后的事件，默认传递过来两个参数
function handleElTreeCheck(data1: any, data2: any) {
  // 拿到全选与半选时候的keys，相当于拿到id
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  // console.log(data2.checkedKeys)
  otherInfo.value = { menuList }
}

const treeRef = ref<InstanceType<typeof ElTree>>()
// 点击编辑的时候取消回显显示的内容
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}

function editCallback(itemData: any) {
  // 等待下一次dom更新刷新的工具方法，vue中更改协议式状态时，最终状态不会立即生效，而是由vue将他们缓存在一个队列
  // 中，直到下一个“tick”才一起执行。   最后传的是proxy，这个不会立即执行，需要使用nextTick，才会立即渲染
  // dom更新完，执行一次回调
  // 在vue3里面是微任务。在vue2里面是一直在转换，一会宏一会微那种转换
  // 放到  promise里面的then执行
  nextTick(() => {
    // 使用工具函数，拿到每一个id
    const menuIds = mapMenuListToIds(itemData.menuList)
    // 拿到id以后重新回显
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style lang="less" scoped></style>
