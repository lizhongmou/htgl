<template>
  <!-- 基础封装 -->
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import ChinaJSON from '../data/china.json'

echarts.registerMap('china', ChinaJSON as any)

interface IProps {
  // 拿到类型 指定具体类型
  option: EChartsOption
}

const props = defineProps<IProps>()

// 拿到ref
const echartRef = ref<HTMLElement>()
// 生命周期
onMounted(() => {
  // 1.初始化echarts实例
  // echartInstance 拿到实例
  const echartInstance = echarts.init(echartRef.value!, 'light', {
    // 渲染引擎
    renderer: 'canvas'
  })

  // 2.第一次进行setOption
  // watchEffect监听option变化, 重新执行
  watchEffect(() => echartInstance.setOption(props.option))

  // 3.监听window缩放
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})

onMounted(() => {})
</script>

<style lang="less" scoped>
.base-echart {
  color: red;
}

.echart {
  height: 300px;
}
</style>
