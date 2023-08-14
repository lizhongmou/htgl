<template>
  <div class="search">
    <!-- 1.输入搜索关键字的表单 -->
    <!-- :model="searchForm"  绑定整个对象 -->
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <!-- el-row默认司24份，如果超过24份，会自动进行换行，因此这里只需要使用一个el-row即可 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <!--   v-model="searchForm.name"分别绑定不同的属性来进行输入、表单的提交 -->
            <el-input
              v-model="searchForm.name"
              placeholder="请输入查询的用户名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="searchForm.realname"
              placeholder="请输入查询的真实姓名"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="searchForm.cellphone"
              placeholder="请输入查询的手机号码"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="searchForm.enable"
              placeholder="请选择查询的状态"
              style="width: 100%"
            >
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 2.重置和搜索的按钮 -->
    <div class="btns">
      <!--  icon="Refresh" 放icon图标，图标来自动态组件 -->
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'

// 添加属性，这样子在上面才可以进行输入
const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  // 这个初始化值有问题，因此无法搜索到数据，需要定义为空的字符串，以前设置的是空数组
  createAt: ''
})
// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

// 这里搜索与重置的原理是：子组件将这个传出去，父组件接收。然后将另一个组件上面添加ref，使用ref来调用另一个组件上面的值或者函数
// ref绑定组件？
// 重置操作，拿到elform组件
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  // 拿到所有的字段，将这个所有的字段进行重置。每个elfrom里面必须添加 prop 属性
  formRef.value?.resetFields()
  // 2.将事件出去, content内部重新发送网络请求
  emit('resetClick')
}

// 搜索，将事件发送给父组件，父组件发送给 usercontent
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
