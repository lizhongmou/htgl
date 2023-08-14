import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByIdRoleId
} from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenuToRoutes, mapMenuToPersssions } from '../../utils/map-menu'
import router from '@/router'
import LoginToken from '@/global/constants'
import useMainStore from '../main/main'
interface userStateType {
  id: number
  token: string
  name: string
  userInfo: any // 因为这个里面的信息比较复杂，可以使用any，也可以自己一个一个定义请求后的数据类型
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): userStateType => ({
    id: -1,
    // 查看是否登录成功
    token: '',
    name: '',
    // 获取本地缓存
    userInfo: {}, // userInfo里面保存的是登陆以后的详细信息
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 登陆账号，获取token（服务器有问题，无法获得数据）
      const res = await accountLoginRequest(account)
      this.token = res.config.data

      console.log(res)
      // 进行本地缓存token，下面需要使用token，因此需要提前获得
      localCache.setCache(LoginToken, this.token)
      // 这里应该是获取登录以后的信息，但是接口有问题。 这个id可以设置为常量
      const userInfoResylt = await getUserInfoById(this.id)
      this.userInfo = userInfoResylt.data // 数据请求失败，接口有问题.成功以后司data类型
      // 根据角色请求用户权限（菜单menus）。因为这个菜单是动态的，根据权限的不同返回不同的菜单列表。根据不同的菜单返回不同的列表
      const userMenysResult = await getUserMenusByIdRoleId(
        this.userInfo.raleo.id // 传入id获取权限相关的数据，这个接口有问题。无法获得数据
      )
      this.userMenus = userMenysResult.data
      this.userInfo = userInfoResylt.data // 这里的userInfo是undefined，接口有问题

      // 5.请求所有roles/departments数据。这里没有使用缓存，因为数据会一直刷新，因此没有进行缓存到本地
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 重要: 获取登录用户的所有按钮的权限。页面刷新以后就没有数据了
      //  mapMenuToPersssions 映射？
      // 要么放缓存 要么重新请求，我这里是重新请求，放在了下面重新请求。请求按键权限
      const permissions = mapMenuToPersssions(userMenus)
      // 保存数据
      this.permissions = permissions

      // 重要: 动态的添加路由。只不过这里是源代码的逻辑，因为他们的端口可以使用，我的无法使用。因此这个是例子
      // 接下来如果使用那个路由我需要手动导入
      // const routes = mapMenuToRoutes(userMenus)
      // routes.forEach((route) => router.addRoute('main', route))

      // 缓存数据，登录的账号、token
      localCache.setCache('userInfo', this.userInfo)
      localCache.setCache('userMenus', this.userMenus)
      // 路由跳转
      router.push('/main')
    },
    // 用户刷新以后会自动销毁已经加载的路由，因此需要使用下面的这个对路由进行重新保存
    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据。在这里重新获得数据
      const token = localCache.getCache(LoginToken)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        // 如果都有值的话，在这里重新进行赋值
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 1..请求所有roles/departments数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 页面刷新以后重新加载
        const permissions = mapMenuToPersssions(userMenus)
        // 保存数据
        this.permissions = permissions

        // 2.动态添加路由。第一次动态添加以后页面刷新会销毁路由，因此需要在这里重新引入
        const routes = mapMenuToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
