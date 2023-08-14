import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/main',
    component: () => import('../views/main/Main.vue'),
    children: [
      {
        path: '/main/analysis/overview',
        component: () => import('../views/main/analysis/overview/overview.vue')
      },
      {
        path: '/main/analysis/dashboard',
        component: () =>
          import('../views/main/analysis/dashboard/dashboard.vue')
      },
      // /main/analysis/analysisUsers
      {
        path: '/main/system/user',
        component: () => import('../views/main/system/user/user.vue')
      },
      {
        path: '/main/analysis/analysisUsers',
        component: () => import('../views/main/system/user/user.vue')
      },
      {
        path: '/main/system/role',
        component: () => import('../views/main/system/role/role.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/not-found/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// // 1.获取所有的路由
// const localRoutes = [
//   {
//     path: '/main/analysis/overview',
//     component: () => import('../views/main/analysis/overview/overview.vue')
//   },
//   {
//     path: '/main/analysis/dashboard',
//     component: () => import('../views/main/analysis/dashboard/dashboard.vue')
//   },
//   {
//     path: '/main/system/user',
//     component: () => import('../views/main/system/user/user.vue')
//   },
//   {
//     path: '/main/system/role',
//     component: () => import('../views/main/system/role/role.vue')
//   }
// ]

// // 2.动态的添加路由
// router.addRoute('main', localRoutes[0])
// router.addRoute('main', localRoutes[1])

// 导航守卫
// 参数: to(跳转到的位置)/from(从哪里跳转过来)
// 返回值: 返回值决定导航的路径(不返回或者返回undefined, 默认跳转)
// 举个栗子: / => /main
// to: /main from: / 返回值: /abc

// 关键
// 因为端口有问题，因此下面的这些代码不能使用
// router.beforeEach((to) => {
//   // 只有登录成功(token), 才能真正进入到main页面。拿token（localCache.getCache）
// LOGIN_TOKEN定义为常量，需要导入 import LoginToken from '@/global/constants'
//   const token = localCache.getCache(LOGIN_TOKEN);
//   if (to.path.startsWith("/main") && !token) {
//     return "/login";
//   }
//   // } else {
//   //   return "/main";
//   // }
// 这个的目的是为了打开页面的时候
//   // 如果是进入到main页面以后打开默认获得的第一个页面，
//   if (to.path === "/main") {
//     // return firstMenu?.url;
//   }
// });

export default router
