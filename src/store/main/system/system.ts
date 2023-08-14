/*
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData
*/
import {
  postUsersListData,
  deleteUserById,
  newUserData,
  editUserData,
  postPageListData,
  deletePageById,
  newPageData,
  editPageData
  //
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import useMainStore from '../main'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      // 带user的只是针对于用户进行的操作
      // 1.删除数据操作
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)

      // 2.重新请求新的数据.删除完成以后重新请求数据，重新渲染页面
      // 参数设置为偏移与请求到的数据量
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    // 新建用户
    async newUserDataAction(userInfo: any) {
      // 1.创建新的用户
      const newResult = await newUserData(userInfo)
      console.log(newResult)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    // 编辑
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      const editResult = await editUserData(id, userInfo)
      // console.log(editResult)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    /** 针对页面的数据: 增删改查 */
    // 这样子更加通用了，传人路径
    // pageName 页面的名字
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = totalCount
      // 获取完整的数据，页面操作完成以后重新获得一次数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)
      console.log(editResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})

export default useSystemStore
