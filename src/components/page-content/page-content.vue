<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">
        {{ contentConfig?.header?.btnTitle ?? '新建数据' }}
      </el-button>
    </div>
    <!--  v-bind="contentConfig.childrenTree" 展开的关键
      这个列表可以展开的关键
    -->
    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <!-- 使用v-if来判断这个，里面放什么值 -->
          <template v-if="item.type === 'timer'">
            <!-- v-bind="item" 语法糖。相当于一个一个的绑定属性 :name="mame" -->
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <!-- 这里是将时间格式化的，并且传入需要格式化的时间 -->
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  size="small"
                  icon="Edit"
                  type="primary"
                  text
                  @click="handleEditBtnClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="isDelete"
                  size="small"
                  icon="Delete"
                  type="danger"
                  text
                  @click="handleDeleteBtnClick(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>

          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <!-- 高阶，自定义这个里面的值
                  1， 先创建一个具名插槽，在外界使用这个具名插槽   :name="item.slotName"
                  2.  然后使用作用域插槽传递出去属性  :prop把需要传递的值传递出去
                  3. :prop="item.prop"
                -->
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                  hName="why"
                ></slot>
              </template>
            </el-table-column>
          </template>

          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <!--   layout="total, sizes, prev, pager, next, jumper" 排列顺序，最终按照这个顺序排列 -->
    <!-- 这个有问题，顺序数据的排列顺序，并不是这个。是使用配置传递的 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
import usePermissions from '@/hooks/usePermissions'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}

// 父子通信
const props = defineProps<IProps>()

// 定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 0.获取是否有对应的增删改查的权限
// ${props.contentConfig.pageName} 拿到每一个组件的定义的名字
// 把定义的这些值绑定到每个组件上面，组件上面使用v-if来进行判断是否显示或者隐藏这些按键
// v3 copy/src/components/page-search/page-search.vue 这个组件里面有单独的使用
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// 1.发起action，请求usersList的数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
// 6.监听systemStore中的actions被执行
// 监听action的改变而进行的操作，因为监听的关于网络请求的数据，因此需要放在网络请求之前
// 监听action有没有被执行，里面会传递参数，可以看piain官网
systemStore.$onAction(({ name, after }) => {
  // after 是等下面的回调执行完成以后才执行after的回调。
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      // 这个是在新建、编辑、删除的时候让页面跳转到第一页
      currentPage.value = 1
    }
  })
})
fetchPageListData()

// 2.获取usersList数据,进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore)

// 3.页码相关的逻辑
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

// 4.定义函数, 用于发送网络请求
function fetchPageListData(formData: any = {}) {
  // 如果为false，直接退出，不发送网络请求
  if (!isQuery) return
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 2.发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  // 根据配置文件里面传入的路径，动态获取路径
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 5.删除/新建/编辑的操作
function handleDeleteBtnClick(id: number) {
  // 根据配置文件里面传入的路径，动态获取路径
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}
function handleNewUserClick() {
  emit('newClick')
}
function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
}

defineExpose({ fetchPageListData })
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
