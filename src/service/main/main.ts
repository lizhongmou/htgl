import hyRequest from '..'

// .因为部门、与角色这个数据有可能会全局进行使用，因此在这里单独定义，并且将这个数据放在全局
// 使用了单独的store进行了网络请求
export function getEntireRoles() {
  return hyRequest.post({
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list'
  })
}
// 拿到完整的菜单
export function getEntireMenus() {
  return hyRequest.post({
    url: '/menu/list'
  })
}
