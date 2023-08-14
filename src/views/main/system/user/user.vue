<template>
  <div class="user">
    <!-- 接收到这个事件名，然后在这里重新定义怎么使用 -->
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <!-- ref="contentRef"  -->
    <user-content
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'

// 对content组件的操作，必须拿到ref
const contentRef = ref<InstanceType<typeof UserContent>>()
// 接收到参数，这个是搜索的时候的操作
function handleQueryClick(formData: any) {
  // 这样子是通过ref来调用这个组件里面的函数，也可以拿到里面的值
  // 这个网络请求的方法需要暴露出来
  contentRef.value?.fetchUserListData(formData)
}
// 这个是重置的时候的操作
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}
// 对modal组件的操作
const modalRef = ref<InstanceType<typeof UserModal>>()
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
function handleEditClick(itemData: any) {
  // console.log(itemData)
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  // 全局增加圆角，下面的hidden是为了下面的圆角进行隐藏
  border-radius: 8px;
  overflow: hidden;
}
</style>
