<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" v-if="isCreate" @click="handleNewUserClick"
        >新建用户</el-button
      >
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50px" />
        <!-- type="index" 自动添加前面的序号？ -->
        <!-- prop里面的数据是从store里面拿到的吗？ -->
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />
        <!--  prop="name" 这里传递的是下面显示的数据，每一列显示的 -->
        <el-table-column
          align="center"
          label="用户名"
          prop="name"
          width="150px"
        />
        <el-table-column
          align="center"
          label="真实姓名"
          prop="realname"
          width="150px"
        />
        <el-table-column
          align="center"
          label="手机号码"
          prop="cellphone"
          width="150px"
        />
        <el-table-column
          align="center"
          label="状态"
          prop="enable"
          width="100px"
        >
          <!-- #default="scope" 作用域插槽。显示启用与禁用 -->
          <!-- scope.row拿到了整行的数据 -->
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.enable ? 'primary' : 'danger'"
              plain
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>

        <!-- 格式化时间 -->
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button
              size="small"
              icon="Edit"
              type="primary"
              text
              @click="handleEditBtnClick(scope.row)"
              v-if="isUpdate"
            >
              编辑
            </el-button>
            <!-- scope.row.id为删除数据的时候传回的id -->
            <el-button
              size="small"
              icon="Delete"
              type="danger"
              text
              v-if="isDelete"
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import usePermissions from '@/hooks/usePermissions'
// import useSystemStore from '../../../../../store/main/system/system'
import formatUTC from '../../../../../utils/format'
import { ref } from 'vue'

// 定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 用户的权限判断
// 通过v-if来进行判断是否显示与隐藏这个按键
// users:create 这些是服务器返回的字段，根据判断返回的字段里面是否包含这些字段而返回 false 或 true
const isCreate = usePermissions('users:create')
const isDelete = usePermissions('users:delete')
const isUpdate = usePermissions('users:delete')
const isQuery = usePermissions('users:query')

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
systemStore.postUsersListAction()
// 发送网络请求
fetchUserListData()

// 2.获取usersList数据,进行展示。调用store里面的方法，然后拿到数据
const { usersList, usersTotalCount } = storeToRefs(systemStore)
// 3.页码相关的逻辑，在这里可以根据网络请求到的数据进行分页？贼神奇啊
function handleSizeChange() {
  fetchUserListData()
}
// 改变每页显示的数量
function handleCurrentChange() {
  fetchUserListData()
}
// 4.定义函数, 用于发送网络请求
// formData接收传递过来的参数
function fetchUserListData(formData: any = {}) {
  if (!isQuery) return
  // 1.获取offset/size。获取请求的数据条数
  const size = pageSize.value
  // 偏移，currentPage.value - 1 目的是：第一次的时候是 （1-1 *10 偏移为 0 第二次的时候是10
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 2.发起网络请求
  // 这个是将传递过来的值与上面定义的值综合到一块来进行网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUsersListAction(queryInfo)
}

// 5.删除/新建/编辑的操作。传递过来里面的参数、值
function handleDeleteBtnClick(id: number) {
  // 调用store里面的删除数据的方法，这个里面的删除数据需要传递id
  systemStore.deleteUserByIdAction(id)
}
function handleNewUserClick() {
  emit('newClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

// 暴露网络请求的方法
defineExpose({ fetchUserListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
