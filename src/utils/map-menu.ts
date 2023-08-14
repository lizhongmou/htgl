import type { RouteRecordRaw } from 'vue-router'

export let firstRoute: RouteRecordRaw | undefined = undefined

function loadLocalRoutes() {
  // 1.加载所有的模板
  const modules: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    { eager: true }
  )
  // 目的是把获得的第一个数据作为打开新页面的根目录，下面应该会进行优化，因此不使用
  // 2.遍历所有的模板为路由对象
  const routes: RouteRecordRaw[] = []
  for (const key in modules) {
    const route = modules[key].default
    routes.push(route)
  }
  return routes
}

/**
 * 映射菜单到路由
 * @param menus 菜单
 * @returns 路由
 */
export function mapMenuToRoutes(menus: any[]) {
  // 1.加载所有的路由对象
  const localRoutes = loadLocalRoutes()

  // 2.路由匹配
  // const finalRoutes: RouteRecordRaw[] = []
  // for (const menu of menus) {
  //   for (const submenu of menu.children) {
  //     const menuUrl = submenu.url
  //     const route = localRoutes.find((item) => item.path === menuUrl)
  //     if (route) {
  //       finalRoutes.push(route)
  //     }
  //   }
  // }

  // 3.不确定有几层
  const finalRoutes: RouteRecordRaw[] = []
  function _recurseGetRoute(menus: any[]) {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = localRoutes.find((item) => item.path === menu.url)
        if (route) finalRoutes.push(route)
        if (!firstRoute && route) firstRoute = route
      } else {
        if (menu.type === 1 && menu.children.length) {
          finalRoutes.push({ path: menu.url, redirect: menu.children[0].url })
        }
        _recurseGetRoute(menu.children ?? [])
      }
    }
  }
  _recurseGetRoute(menus)

  return finalRoutes
}

// 返回面包屑
export function mapPathToBreadcrumbs(menus: any[], path: string) {
  const breadcrumbs: any[] = []
  // 1.两层遍历,如果有多层需要多层遍历或者使用递归
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

export function mapPathToMenu(menus: any[], path: string) {
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) return submenu
    }
  }
}
/**
 * 菜单映射到id的列表
 * @param menuList
 * 遍历三层，正常开发的时候不止三层，一般使用递归
 * 这里使用的是递归
 */

export function mapMenuToIds(menus: any[]) {
  const ids: number[] = []
  // 递归 获取id
  function _recurseGetId(menusList: any[]) {
    for (const menu of menusList) {
      // 如果还有下一层的话就调用下面的函数，直到没有
      if (menu.children) {
        _recurseGetId(menu.children)
      } else {
        // 拿到最下面的值，添加到ids里面去
        ids.push(menu.id)
      }
    }
  }
  // 有直就一直调用
  _recurseGetId(menus)
  // 返回最终的值
  return ids
}

/**
 * 从菜单映射到按钮的权限
 * @param menuList 菜单的列表
 * @returns 权限的数组(字符串数组)
 */
export function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = []

  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      // 按键的级别是第三级
      // 第一级是大的菜单、第二级是每一个页面、第三是这个按键
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        // 递归操作？遍历空数组，什么都不做，循环直接结束
        // 空数组直接结束递归？
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)

  return permissions
}
