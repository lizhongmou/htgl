<!-- 插槽的高阶使用 -->
<template>
  <div class="department">
    <!-- 配置文件（searchConfig）传给pagesearch -->
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
    >
      <!-- 使用这个具名插槽，并接收传递过来的值，prop。#leader="scope" -->
      <template #leader="scope">
        <!-- 在这里使用传递过来的值，prop。
            只有这样子才可以单独的定义css属性
              接收的是这个值？  3. :prop="item.prop"
        -->
        <span class="leader">哈哈哈: {{ scope.row[scope.prop] }}</span>
      </template>
      <template #parent="scope">
        <span class="parent">呵呵呵: {{ scope.row[scope.prop] }}</span>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from 'vue'
import useMainStore from '@/store/main/main'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
// import PageContent from './c-cpns/page-content.vue'
// import PageModal from './c-cpns/page-modal.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

// 导入配置文件
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
// 对modalConfig进行操作。这样子可以动态的添加添加部门的时候选择到的部门
// 动态的添加属性
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  // 使用映射
  const departments = mainStore.entireDepartments.map((item) => {
    // 默认只有name与id
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      // 添加
      item.options.push(...departments)
    }
  })

  return modalConfig
})

// setup相同的逻辑的抽取: hooks
// 点击search, content的操作
// v3 里面抽取的使用 hooks
// 元组的顺序不能随便写
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 点击content, modal的操作
const { modalRef, handleNewClick, handleEditClick } = usePageModal()
</script>

<style scoped></style>
