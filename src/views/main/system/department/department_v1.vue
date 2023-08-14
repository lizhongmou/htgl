<template>
  <div class="department">
    <!-- 搜索 -->
    <page-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <!-- 新建 -->
    <page-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from 'vue'
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'

// 点击search, content的操作
// 搜索
const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
// 重置
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

// 点击content, modal的操作。拿到组件
const modalRef = ref<InstanceType<typeof PageModal>>()
function handleNewClick() {
  // 调用 PageModal 里面的方法
  modalRef.value?.setModalVisible()
}
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style scoped></style>
