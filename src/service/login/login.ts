import hyRequest from '../index'
import type { IAccount } from '@/types'

// 登陆
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: '/users/${id}'
    // 这里需要携带的参数在响应拦截里面添加了。这里带的是参数（允许）
  })
}

export function getUserMenusByIdRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
