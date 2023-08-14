import useLoginStore from '@/store/login/login'

function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore

  // 装换为boolean值，两次取反
  // includes 是否包含
  return !!permissions.find((item) => item.includes(permissionID))
}

export default usePermissions
