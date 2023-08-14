<template>
  <div class="count-card">
    <div class="header">
      <span class="title">{{ title }}</span>
      <el-tooltip :content="tips" placement="top" effect="dark">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <!-- <span v-if="amount === 'saleroom'">¥</span> -->
      <span ref="count1Ref">{{ number1 }}</span>
    </div>
    <div class="footer">
      <span>{{ subtitle }}</span>
      <!-- <span v-if="amount === 'saleroom'">¥</span> -->
      <span ref="count2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// 做动画的库  演示的网址 https://inorganik.github.io/countUp.js/
// github库   https://github.com/inorganik/countUp.js
import { CountUp } from 'countup.js'
import { ref, onMounted } from 'vue'

interface IProps {
  amount?: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}

const props = withDefaults(defineProps<IProps>(), {
  title: '商品总销量',
  tips: '所有的商品总销量',
  number1: 509989,
  number2: 509989,
  subtitle: '商品总销量'
})

// 创建CountUp的实例对象
const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()
// 参数一: 执行动画的元素
// 参数二: 数字增加 10000
const countOption = {
  // 是否有，如果没有就不用添加
  prefix: props.amount === 'saleroom' ? '¥' : ''
}
onMounted(() => {
  // 参数1 执行动画的元素
  // 参数2  数字增加 到某一个值
  // 参数3  前缀参数 prefix
  // count1Ref.value! 非空断言，表示一定有值。但是这个不一定有值，需要在生命周期里面做
  // 因此在生命周期里面坐onMounted
  // 在这里只需要调用就行了
  const countup1 = new CountUp(count1Ref.value!, props.number1, countOption)
  const countup2 = new CountUp(count2Ref.value!, props.number2, countOption)
  // start必须添加，开始动画。定义的这个开始动画
  countup1.start()
  countup2.start()
})
</script>

<style lang="less" scoped>
.count-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: flex-end;
  }

  .content {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
  }

  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
