import hyRequest from '@/service'

// 定义了网络请求，但是使用的时候是在store里面进行
/** 用户的网络请求 */
// 动态的获得每一次请求的数据量，根据下面页数上面设置的10,20,30 设置
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
// 删除
export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}
// 新建
export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}
// 编辑
export function editUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

/** 针对页面的网络请求: 增删改查 */
// 传入路径、请求数据。前提是接口必须规范
//  pagename 页面名字
export function postPageListData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageById(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
