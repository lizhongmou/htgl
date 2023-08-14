<template>
  <div class="pane-account">
    <el-form
      ref="ruleFormRef"
      label-width="60px"
      class="demo-ruleForm"
      :model="account"
      status-icon
      size="large"
      :rules="currentrules"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { ElForm, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import useLoginStore from '../../../store/login/login'
import type { IAccount } from '../../../types/index'
import { localCache } from '../../../utils/cache'
const localName = 'name'
const localPwd = 'password'

// 定义数据页面的数据
const account = reactive<IAccount>({
  name: localCache.getCache(localName) ?? '',
  password: localCache.getCache(localPwd) ?? ''
})
// 表单校验
const currentrules = reactive<FormRules>({
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    //  pattern 正则表达式校验规则，required为空。message提示信息，trigger失去焦点
    // 第一个是校验规则、第二个是提示、第三个是触发
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
})

// 登录操作
const ruleFormRef = ref<InstanceType<typeof ElForm>>() // 拿到这个组件
const loginStore = useLoginStore()
function loginAction(isrmemberpwd: boolean) {
  // 校验是否登录成功
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password
      //  登陆
      loginStore.loginAccountAction({ name, password }).then((res) => {
        if (isrmemberpwd) {
          // 记住密码,记住密码以后然后将这个密码设置到本地
          localCache.setCache(localName, name)
          localCache.setCache(localPwd, password)
        } else {
          // 退出以后移除
          localCache.removeCache(localName)
          localCache.removeCache(localPwd)
        }
      })
    } else {
      console.log('err')
      ElMessage.error('Oops,请重新输入~~')
    }
  })
}
// 将 loginAction暴露出去
defineExpose({
  loginAction
})
</script>

<style scoped lang="less"></style>
