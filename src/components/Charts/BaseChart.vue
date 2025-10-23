<template>
  <div ref="chartRef" class="chart" style="width: 100%; height: 400px"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  option: { type: Object, required: true },
  theme: { type: String, default: 'light' }
})

const chartRef = ref(null)
let chartInstance = null

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value, props.theme)
    chartInstance.setOption(props.option)
  }
}

// 监听 option 变化自动更新
watch(() => props.option, (newOption) => {
  if (chartInstance && newOption) {
    chartInstance.setOption(newOption)
  }
}, { deep: true })

// 监听窗口变化自适应
window.addEventListener('resize', () => {
  chartInstance?.resize()
})

onMounted(initChart)

onBeforeUnmount(() => {
  chartInstance?.dispose()
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
