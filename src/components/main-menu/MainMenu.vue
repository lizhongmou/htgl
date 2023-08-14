<template>
  <div class="mainmenu">
    <!-- logo -->
    <div class="logo">
      <img src="../../assets//img/logo.svg" class="img" alt="" srcset="" />
      <h2 v-show="!isFold" class="title">谋子管理系统</h2>
    </div>
    <!-- menu -->
    <div class="menu">
      <!-- :collapse="isFold" 通过组件通信来进行改变这里是否拉伸 -->
      <!-- router 使用index为索引进行路由跳转 -->
      <!-- default-active="analysisUsers" 通过这里传递的值来进行判断是使用那个页面
        不不不 是打开的是那个页面，默认打开的页面
      -->
      <el-menu
        :default-active="modulesactive"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="isFold"
        router
        Tooltip="dark"
      >
        <!-- 系统总览 -->
        <el-sub-menu index="1" popper-class="abc">
          <template #title>
            <!-- 插槽 -->
            <el-icon><MapLocation /></el-icon>
            <span>系统总览</span>
          </template>
          <el-menu-item index="overview">核心技术</el-menu-item>
          <el-menu-item index="dashboard">商品统计</el-menu-item>
        </el-sub-menu>
        <!-- 系统管理 -->
        <el-sub-menu index="2">
          <template #title>
            <el-icon><CoffeeCup /></el-icon>
            <span>系统管理</span>
          </template>
          <!-- 这里可以通过这个index动态跳转 -->
          <!-- /main/analysis/analysisUsers -->
          <el-menu-item index="analysisUsers">用户管理</el-menu-item>
          <el-menu-item index="2-2">部门管理</el-menu-item>
          <el-menu-item index="2-3">菜单管理</el-menu-item>
          <el-menu-item index="2-4">角色管理</el-menu-item>
        </el-sub-menu>
        <!-- 商品中心 -->
        <el-sub-menu index="3">
          <template #title>
            <el-icon><MapLocation /></el-icon>
            <span>商品中心</span>
          </template>
          <el-menu-item index="3-1">商品类别</el-menu-item>
          <el-menu-item index="3-2">商品信息</el-menu-item>
        </el-sub-menu>
        <!-- 随便聊聊 -->
        <el-sub-menu index="4">
          <template #title>
            <el-icon><MapLocation /></el-icon>
            <span>随便聊聊</span>
          </template>
          <el-menu-item index="4-1">你的故事</el-menu-item>
          <el-menu-item index="4-2">故事列表</el-menu-item>
          <el-sub-menu index="4-3">
            <template #title>
              <el-icon><MapLocation /></el-icon>
              <span>music</span>
            </template>
            <el-menu-item index="4-3-1">周杰伦</el-menu-item>
            <el-menu-item index="4-3-2">周星驰</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
      <!-- 遍历，只不过没有数据，因为接口有问题 -->
      <!--  :collapse="isFold" -->
      <!-- <el-menu
        default-active="3"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      > -->
      <!-- 遍历整个菜单 -->
      <!-- <template v-for="item in userInfoItem" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title> -->
      <!-- 字符串: el-icon-monitor => 组件 component动态组件 -->
      <!-- <el-icon>
        这个是一个动态组件，为了获得服务器返回的icon图标而截取的操作
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template> -->
      <!--
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)" > -->
      <!-- @click="handleItemClick(subitem)" -->
      <!-- {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template> -->
      <!-- </el-menu> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '../../router'
import useLoginStore from '../../store/login/login'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenu } from '../../utils/map-menu'
import { ElMenu, ElSubMenu } from 'element-plus'
// 0.定义props
defineProps({
  isFold: {
    type: Boolean,
    default: true
  }
})

// 从服务器动态获得列表
const userLogin = useLoginStore()
const userInfoItem = userLogin.userInfo

//
const modulesactive = 'analysisUsers'
console.log(ElMenu, ElSubMenu)
// 2.监听item的点击

const routers = useRouter()
function handleItemClick(item: any) {
  const url = item.url
  routers.push(url)
}
// 让页面刷新以后，页面跳转的路由与点击事件的路由保持一致
// 3.ElMenu的默认菜单
const route = useRoute()
const defaultActive = computed(() => {
  // 匹配面包屑的路径，使用计算属性
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style scoped lang="less">
.mainmenu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
  --active-color: #fff;
  --text-color: #b7bdc3;
  --bg-color: #001529;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
    --el-fill-color-blank: pink !important;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
