import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'
// 定义的类型
type CallbackFnType = (data?: any) => void

// editCallback传递过来的参数，然后定义了这个是一个函数类型，里面需要传递的参数是any类型
// 并且是一个可选的值
function usePageModal(
  newCallback?: CallbackFnType,
  editCallback?: CallbackFnType
) {
  const modalRef = ref<InstanceType<typeof PageModal>>()

  function handleNewClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }
  function handleEditClick(itemData: any) {
    // 1.让modal显示出来
    modalRef.value?.setModalVisible(false, itemData)
    // 2.编辑的回调
    // 判断这个有值，然后调用这个函数？
    // 回调 editCallback，回调传入的函数
    if (editCallback) editCallback(itemData)
  }

  return { modalRef, handleNewClick, handleEditClick }
}

export default usePageModal
