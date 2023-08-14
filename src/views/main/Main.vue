<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="main">
    <div class="common-layout">
      <el-container>
        <el-aside :width="isFold ? '60px' : '210px'">
          <MainMenu :is-fold="isFold" />
        </el-aside>
        <el-container>
          <el-header height="50px" @fold-change="handleFoldChange">
            <MainHeader @fold-change="handleFoldChange" />
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainMenu from '../../components/main-menu/MainMenu.vue'
import MainHeader from '../../components/main-header/MainHeader.vue'
// 处理main-header中折叠的变化
const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  isFold.value = flag
}
</script>

<style scoped lang="less">
.main {
  width: 100vw;
  height: 100vh;
  .common-layout {
    height: 100%;
    width: 100%;
    .el-container {
      height: 100%;
      .el-aside {
        overflow-x: hidden;
        overflow-y: auto;
        line-height: 200px;
        text-align: left;
        cursor: pointer;
        background-color: #001529;
        scrollbar-width: none; /* firefox */
        -ms-overflow-style: none; /* IE 10+ */
        transition: width 0.3s ease;
        &::-webkit-scrollbar {
          display: none;
        }
      }

      .el-container {
        .el-header {
        }
        .el-main {
          background-color: bisque;
        }
      }
    }
    // background-color: pink;
  }
}
// .mainheader {
//   font-family: 'Courier New', Courier, monospace;
//   color: red;
// }
</style>
